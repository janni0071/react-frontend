// src/pages/Lehrbetriebe/LehrbetriebErstellen.jsx
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function LehrbetriebLernendeErstellen() {
    const { loading, error, message, doRequest } = useApi();
    const navigate = useNavigate();

    // Local states for each field in tbl_lehrbetrieb
    const [fk_lehrbetrieb, setLehrbetrieb] = useState('');
    const [fk_lernende, setLernende] = useState('');
    const [start, setStart] = useState('');
    const [ende, setEnde] = useState('');
    const [beruf, setBeruf] = useState('');
    const [lehrbetriebe, setLehrbetriebe] = useState([]);

    // Fetch lehrbetriebe on mount
        useEffect(() => {
            const fetchLehrbetriebe = async () => {
                const result = await doRequest({
                    url: 'https://api.test/lehrbetriebe',
                    method: 'GET',
                });
    
                if (result.success) {
                    // Sort lehrbetriebe alphabetically by name
                    const sortedLehrbetriebe = result.data.sort((a, b) => 
                        a.lehrbetrieb.localeCompare(b.lehrbetrieb)
                    );
                    setLehrbetriebe(sortedLehrbetriebe);
                } else {
                    console.error('Failed to fetch Lehrbetriebe:', result.error);
                }
            };
    
            fetchLehrbetriebe();
        }, [doRequest]);
    
    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/lehrbetrieb_lernende',
            method: 'POST',
            body: {
                fk_lehrbetrieb,
                fk_lernende,
                start,
                ende,
                beruf,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setLehrbetrieb('');
            setLehrbetriebe('');
            setLernende('');
            setStart('');
            setEnde('');
            setBeruf('');
            console.log('Created Lehrbetrieb_Lernende:', result.data);
            navigate(`/lehrbetrieb_lernende`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Lehrbetrieb mit Lernenden erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }

            {/* Lehrbetrieb Selection Dropdown */}
            <label htmlFor="fk_lehrbetrieb">Lehrbetrieb *</label>
            <select id="fk_lehrbetrieb" value={fk_lehrbetrieb} onChange={(e) => setLehrbetrieb(e.target.value)}>
                <option value="">-- Wähle einen Lehrbetrieb --</option>
                {lehrbetriebe.map((lehrbetrieb) => (
                    <option key={lehrbetrieb.id_lehrbetrieb} value={lehrbetrieb.id_lehrbetrieb}>{lehrbetrieb.firma}</option>
                ))}
            </select>
            {error?.fk_lehrbetrieb && <p className="error">{error.fk_lehrbetrieb}</p>}

            <LabelInput
                label="Lernende"
                id="fk_lernende"
                type="number"
                value={fk_lernende}
                onChange={(e) => setLernende(e.target.value)}
            />
            {error?.fk_lehrbetrieb && <p className="error">{error.fk_lernende}</p>}

            <LabelInput
                label="Start"
                id="start"
                type="text"
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            {error?.start && <p className="error">{error.start}</p>}

            <LabelInput
                label="Ende"
                id="ende"
                type="text"
                value={ende}
                onChange={(e) => setEnde(e.target.value)}
            />
            {error?.ende && <p className="error">{error.ende}</p>}

            <LabelInput
                label="Beruf"
                id="beruf"
                type="text"
                value={beruf}
                onChange={(e) => setBeruf(e.target.value)}
            />
            {error?.beruf && <p className="error">{error.beruf}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default LehrbetriebLernendeErstellen;
