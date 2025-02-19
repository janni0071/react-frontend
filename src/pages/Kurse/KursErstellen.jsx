// src/pages/Kurse/KursErstellen.jsx

import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function KursErstellen() {
    const { loading, error, message, doRequest } = useApi();
    const navigate = useNavigate();

    // Local states for each field in tbl_kurse
    const [kursnummer, setKursnummer] = useState('');
    const [kursthema, setKursthema] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [fk_dozent, setDozent] = useState('');
    const [startdatum, setStartdatum] = useState('');
    const [enddatum, setEnddatum] = useState('');
    const [dauer, setDauer] = useState('');
    const [dozenten, setDozenten] = useState([]);

    // Fetch dozenten on mount
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

    // Handler for creating a new Kurs
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/kurse',
            method: 'POST',
            body: {
                kursnummer,
                kursthema,
                inhalt,
                fk_dozent,
                startdatum,
                enddatum,
                dauer,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setKursnummer('');
            setKursthema('');
            setInhalt('');
            setDozent('');
            setDozenten('');
            setStartdatum('');
            setEnddatum('');
            setDauer('');
            console.log('Created Kurs:', result.data);
            navigate(`/kurse`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Kurs erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {message && <p>{message}</p>}
            

            <LabelInput
                label="Kursnummer *"
                id="kursnummer"
                value={kursnummer}
                onChange={(e) => setKursnummer(e.target.value)}
            />
            {error?.kursnummer && <p className="error">{error.kursnummer}</p>}

            <LabelInput
                label="Kursthema *"
                id="kursthema"
                value={kursthema}
                onChange={(e) => setKursthema(e.target.value)}
            />
            {error?.kursthema && <p className="error">{error.kursthema}</p>}

            <LabelInput
                label="Inhalt"
                id="inhalt"
                type="text"
                value={inhalt}
                onChange={(e) => setInhalt(e.target.value)}
            />
            {error?.inhalt && <p className="error">{error.inhalt}</p>}

            {/* Dozent Selection Dropdown */}
            <label htmlFor="fk_dozent">Dozent *</label>
            <select id="fk_dozent" value={fk_dozent} onChange={(e) => setDozent(e.target.value)}>
                <option value="">-- Wähle einen Dozenten --</option>
                {dozenten.map((dozent) => (
                    <option key={dozent.id_dozent} value={dozent.id_dozent}>{dozent.vorname} {dozent.nachname}</option>
                ))}
            </select>
            {error?.fk_dozent && <p className="error">{error.fk_dozent}</p>}

            <LabelInput
                label="Startdatum"
                id="startdatum"
                value={startdatum}
                type="date"
                onChange={(e) => setStartdatum(e.target.value)}
            />
            {error?.startdatum && <p className="error">{error.startdatum}</p>}

            <LabelInput
                label="Enddatum"
                id="enddatum"
                value={enddatum}
                type="date"
                onChange={(e) => setEnddatum(e.target.value)}
            />
            {error?.enddatum && <p className="error">{error.enddatum}</p>}

            <LabelInput
                label="Dauer"
                id="dauer"
                value={dauer}
                type="number"
                onChange={(e) => setDauer(e.target.value)}
            />
            {error?.dauer && <p className="error">{error.dauer}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default KursErstellen;