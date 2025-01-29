// src/pages/lehrbetriebe/LehrbetriebAnpassen.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import '../../styles/Lehrbetriebe.css';

function LehrbetriebAnpassen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, message, doRequest } = useApi();

    // Local state mirrors the tbl_lehrbetrieb columns
    const [firma, setFirma] = useState('');
    const [strasse, setStrasse] = useState('');
    const [plz, setPlz] = useState('');
    const [ort, setOrt] = useState('');

    // 1) Fetch existing data so we can fill the form fields
    useEffect(() => {
        // We fetch once upon mount (or when `id` changes)
        doRequest({ url: `https://api.test/lehrbetriebe/${id}` });
    }, [doRequest, id]);

    // 2) Whenever `data` updates, sync local state (if data is loaded successfully)
    useEffect(() => {
        if (data) {
            setFirma(data.firma || '');
            setStrasse(data.strasse || '');
            setPlz(data.plz || '');
            setOrt(data.ort || '');
        }
    }, [data]);

    // 3) Handle the PUT request to update the Lehrbetrieb
    const handleUpdate = async () => {
        const result = await doRequest({
            url: `https://api.test/lehrbetriebe/${id}`,
            method: 'PUT',
            body: { firma, strasse, plz, ort },
        });

        if (result.success) {
            console.log('Lehrbetrieb updated:', result.data);
            // Optionally redirect back to the Lehrbetrieb detail page
            navigate(`/lehrbetriebe/${id}`);
        } else {
            console.error('Update failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Lehrbetrieb anpassen</h1>

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
                label="Firma"
                id="firma"
                value={firma}
                onChange={(e) => setFirma(e.target.value)}
            />

            <LabelInput
                label="Strasse"
                id="strasse"
                value={strasse}
                onChange={(e) => setStrasse(e.target.value)}
            />

            <LabelInput
                label="PLZ"
                id="plz"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
            />

            <LabelInput
                label="Ort"
                id="ort"
                value={ort}
                onChange={(e) => setOrt(e.target.value)}
            />

            {/* Update button */}
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
}

export default LehrbetriebAnpassen;
