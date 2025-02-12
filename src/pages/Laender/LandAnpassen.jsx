// src/pages/Laender/LandAnpassen.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import '../../styles/Laender.css';

function LandAnpassen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, message, doRequest } = useApi();

    // Local state mirrors the tbl_countries columns
    const [country, setLand] = useState('');

    // 1) Fetch existing data so we can fill the form fields
    useEffect(() => {
        // We fetch once upon mount (or when `id` changes)
        doRequest({ url: `https://api.test/laender/${id}` });
    }, [doRequest, id]);

    // 2) Whenever `data` updates, sync local state (if data is loaded successfully)
    useEffect(() => {
        if (data) {
            setLand(data.country || '');
        }
    }, [data]);

    // 3) Handle the PUT request to update the Land
    const handleUpdate = async () => {
        const result = await doRequest({
            url: `https://api.test/laender/${id}`,
            method: 'PUT',
            body: { country },
        });

        if (result.success) {
            console.log('Land updated:', result.data);
            // Optionally redirect back to the Land detail page
            navigate(`/laender/${id}`);
        } else {
            console.error('Update failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Land anpassen</h1>

            {/* Loading indicator */}
            {loading && (
                <div className="spinner">
                    <div></div>
                </div>
            )}

            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p className="error" key={index}>{`${errMsg}`}</p>
                    ))}
                </div>
            )}

            {/* Form Fields */}
            <LabelInput
                label="Land *"
                id="land"
                value={country}
                onChange={(e) => setLand(e.target.value)}
            />

            {/* Update button */}
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
}

export default LandAnpassen;
