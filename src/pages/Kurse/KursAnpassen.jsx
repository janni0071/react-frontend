// src/pages/lehrbetriebe/LehrbetriebAnpassen.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import '../../styles/Kurse.css';

function KursAnpassen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, message, doRequest } = useApi();

    // Local state mirrors the tbl_lehrbetrieb columns
    const [kursnummer, setKursnummer] = useState('');
    const [kursthema, setKursthema] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [fk_dozent, setDozent] = useState('');
    const [startdatum, setStartdatum] = useState('');
    const [enddatum, setEnddatum] = useState('');
    const [dauer, setDauer] = useState('');
    const [dozenten, setDozenten] = useState([]);

    // 1) Fetch existing data so we can fill the form fields
    useEffect(() => {
        // We fetch once upon mount (or when `id` changes)
        doRequest({ url: `https://api.test/kurse/${id}` });
    }, [doRequest, id]);

    // Fetch countries on mount
    useEffect(() => {
        const fetchDozenten = async () => {
            const result = await doRequest({
                url: 'https://api.test/dozenten',
                method: 'GET',
            });

            if (result.success) {
                setDozenten(result.data);
            } else {
                console.error('Failed to fetch dozenten:', result.error);
            }
        };

        fetchDozenten();
    }, [doRequest]);

    // 2) Whenever `data` updates, sync local state (if data is loaded successfully)
    useEffect(() => {
        if (data) {
            setKursnummer(data.kursnummer || '');
            setKursthema(data.kursthema || '');
            setInhalt(data.inhalt || '');
            setDozent(data.dozenten || '');
            setStartdatum(data.startdatum || '');
            setEnddatum(data.enddatum || '');
            setDauer(data.dauer || '');
        }
    }, [data]);

    // 3) Handle the PUT request to update the Lehrbetrieb
    const handleUpdate = async () => {
        const result = await doRequest({
            url: `https://api.test/kurse/${id}`,
            method: 'PUT',
            body: { kursnummer, kursthema, inhalt, dozenten, startdatum, enddatum, dauer },
        });

        if (result.success) {
            console.log('Kurs updated:', result.data);
            // Optionally redirect back to the Lehrbetrieb detail page
            navigate(`/kurse/${id}`);
        } else {
            console.error('Update failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Kurs anpassen</h1>

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
                label="Kursnummer *"
                id="kursnummer"
                value={kursnummer}
                onChange={(e) => setKursnummer(e.target.value)}
            />

            <LabelInput
                label="Kursthema *"
                id="kursthema"
                value={kursthema}
                onChange={(e) => setKursthema(e.target.value)}
            />

            <LabelInput
                label="Inhalt"
                id="inhalt"
                type="text"
                value={inhalt}
                onChange={(e) => setInhalt(e.target.value)}
            />

            {/* Country Selection Dropdown */}
            <label htmlFor="fk_dozent">Dozent *</label>
            <select id="fk_dozent" value={fk_dozent} onChange={(e) => setDozent(e.target.value)}>
                <option value="">-- Wähle einen Dozenten --</option>
                {dozenten.map((dozent) => (
                    <option key={dozent.id_dozent} value={dozent.id_dozent}>{dozent.vorname} {dozent.nachname}</option>
                ))}
            </select>

            <LabelInput
                label="Startdatum"
                id="startdatum"
                value={startdatum}
                type="date"
                onChange={(e) => setStartdatum(e.target.value)}
            />

            <LabelInput
                label="Enddatum"
                id="enddatum"
                value={enddatum}
                type="date"
                onChange={(e) => setEnddatum(e.target.value)}
            />

            <LabelInput
                label="Dauer"
                id="dauer"
                value={dauer}
                type="number"
                onChange={(e) => setDauer(e.target.value)}
            />

            {/* Update button */}
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
}

export default KursAnpassen;
