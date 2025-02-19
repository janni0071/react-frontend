// src/pages/Lehrbetriebe/LehrbetriebErstellen.jsx
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function KurseLernendeErstellen() {
    const { loading, error, message, doRequest } = useApi();
    const navigate = useNavigate();

    // Local states for each field in tbl_lehrbetrieb
    const [fk_kurs, setKurs] = useState('');
    const [fk_lernende, setLehrling] = useState('');
    const [role, setNote] = useState('');
    const [kurse, setKurse] = useState([]);
    const [lernende, setLernende] = useState([]);

    // Fetch lehrbetriebe on mount
    useEffect(() => {
        const fetchKurse = async () => {
            const result = await doRequest({
                url: 'https://api.test/kurse',
                method: 'GET',
            });

            if (result.success) {
                setKurse(result.data);
            } else {
                console.error('Failed to fetch Kurse:', result.error);
            }
        };

        fetchKurse();
    }, [doRequest]);

    // Fetch lernende on mount
    useEffect(() => {
        const fetchLernende = async () => {
            const result = await doRequest({
                url: 'https://api.test/lernende',
                method: 'GET',
            });

            if (result.success) {
                setLernende(result.data);
            } else {
                console.error('Failed to fetch Lernende:', result.error);
            }
        };

        fetchLernende();
    }, [doRequest]);
    
    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/kurse_lernende',
            method: 'POST',
            body: {
                fk_kurs,
                fk_lernende,
                role,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setKurs('');
            setKurse('');
            setLehrling('');
            setNote('');
            console.log('Created Kurse_Lernende:', result.data);
            navigate(`/kurse_lernende`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Kurs mit Lernenden erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }

            {/* Kurs Selection Dropdown */}
            <label htmlFor="fk_kurs">Kurs *</label>
            <select id="fk_kurs" value={fk_kurs} onChange={(e) => setKurs(e.target.value)}>
                <option value="">-- Wähle einen Kurs --</option>
                {kurse.map((kurs) => (
                    <option key={kurs.id_kurs} value={kurs.id_kurs}>{kurs.kursnummer} {kurs.kursthema}</option>
                ))}
            </select>
            {error?.fk_kurs && <p className="error">{error.fk_kurs}</p>}

            {/* Lehrling Selection Dropdown */}
            <label htmlFor="fk_lernende">Lernende *</label>
            <select id="fk_lernende" value={fk_lernende} onChange={(e) => setLehrling(e.target.value)}>
                <option value="">-- Wähle eine/n Lernende/n --</option>
                {lernende.map((lehrling) => (
                    <option key={lehrling.id_lernende} value={lehrling.id_lernende}>{lehrling.vorname} {lehrling.nachname}</option>
                ))}
            </select>
            {error?.fk_lernende && <p className="error">{error.fk_lernende}</p>}

            <LabelInput
                label="Note"
                id="role"
                type="text"
                value={role}
                onChange={(e) => setNote(e.target.value)}
            />
            {error?.role && <p className="error">{error.role}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default KurseLernendeErstellen;
