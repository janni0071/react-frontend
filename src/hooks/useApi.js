// src/hooks/useApi.js

import { useState, useCallback } from 'react';

/**
 * A universal hook for making HTTP requests to your backend, which always
 * returns JSON in the structure:
 *   {
 *     "status": "success" | "error",
 *     "message": "Some message",
 *     "data": { ... } or [...]
 *   }
 *
 * STATE EXPLANATION:
 *   - data: The server's "data" field if "success"
 *   - message: The server's "message" field
 *   - error: Holds an error message if the request fails (HTTP error, or status="error")
 *   - loading: True while the request is ongoing
 *
 * FUNCTION:
 *   doRequest(options):
 *     options = { url, method='GET', body=null, headers={} }
 *
 * RETURNS an object:
 *   - { success: true, data } if the request is successful
 *   - { success: false, error } if not
 */
export function useApi() {
    const [data, setData] = useState(null);     // success payload
    const [message, setMessage] = useState(null);  // success message
    const [error, setError] = useState(null);   // error message (if any)
    const [loading, setLoading] = useState(false);

    /**
     * doRequest is the function to call in your components.
     * e.g. doRequest({ url: '/api/lehrbetriebe', method: 'GET' })
     */
    const doRequest = useCallback(
        async ({ url, method = 'GET', body = null, headers = {} }) => {
            setLoading(true);
            setError(null);
            setMessage(null);
            setData(null);

            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                    body: body ? JSON.stringify(body) : null,
                });

                // If HTTP status not 2xx, parse what the server sent
                if (!response.ok) {
                    const errorJson = await response.json().catch(() => null);
                    const errorMsg =
                        (errorJson?.message) ||
                        `${response.status} | Unerwarteter Fehler beim Laden der Daten.`;

                    console.log('doRequest error:', errorMsg);
                    console.log('doRequest errorJson:', errorJson);
                    
                    setError(errorJson?.data || {});
                    return { success: false, error: errorMsg };
                }

                // On success status, parse
                const json = await response.json();
                // Expected: { status, message, data }
                const { status, message, data } = json;

                // If "status" is "error" in JSON, treat it as an error
                if (status === 'error') {
                    const errorMsg = message || 'Der Server hat einen Fehler gemeldet.';
                    console.log('doRequest error:', errorMsg);
                    setError(data || {});
                    return { success: false, error: errorMsg };
                }

                // Otherwise, "success"
                setMessage(message);
                setData(data);

                return { success: true, data };
            } catch (err) {
                // Network or unexpected error
                const errorMsg = err.message || 'Unknown network error';
                console.log('doRequest error:', errorMsg);                
                setError({});
                return { success: false, error: errorMsg };
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { data, message, error, loading, doRequest };
}