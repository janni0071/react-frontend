// src/pages/lehrbetriebe/LehrbetriebErstellen.jsx
import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function DozentErstellen() {
    const { loading, error, message, doRequest } = useApi();
    const navigate = useNavigate();

    // Local states for each field in tbl_lehrbetrieb
    const [vorname, setVorname] = useState('');
    const [nachname, setNachname] = useState('');
    const [strasse, setStrasse] = useState('');
    const [plz, setPlz] = useState('');
    const [ort, setOrt] = useState('');
    const [fk_land, setLand] = useState('');
    const [geschlecht, setGeschlecht] = useState('');
    const [telefon, setTelefon] = useState('');
    const [handy, setHandy] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [countries, setCountries] = useState([]);

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            const result = await doRequest({
                url: 'https://api.test/laender',
                method: 'GET',
            });

            if (result.success) {
                setCountries(result.data);
            } else {
                console.error('Failed to fetch countries:', result.error);
            }
        };

        fetchCountries();
    }, [doRequest]);

    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/dozenten',
            method: 'POST',
            body: {
                vorname,
                nachname,
                strasse,
                plz,
                ort,
                fk_land,
                geschlecht,
                telefon,
                handy,
                email,
                birthdate,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setVorname('');
            setNachname('');
            setStrasse('');
            setPlz('');
            setOrt('');
            setLand('');
            setCountries('');
            setGeschlecht('');
            setTelefon('');
            setHandy('');
            setEmail('');
            setBirthdate('');
            console.log('Created Dozent:', result.data);
            navigate(`/dozenten`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Dozent erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {message && <p>{message}</p>}
            

            <LabelInput
                label="Vorname *"
                id="vorname"
                value={vorname}
                onChange={(e) => setVorname(e.target.value)}
            />
            {error?.vorname && <p className="error">{error.vorname}</p>}

            <LabelInput
                label="Nachname *"
                id="nachname"
                value={nachname}
                onChange={(e) => setNachname(e.target.value)}
            />
            {error?.nachname && <p className="error">{error.nachname}</p>}

            <LabelInput
                label="Strasse"
                id="strasse"
                type="text"
                value={strasse}
                onChange={(e) => setStrasse(e.target.value)}
            />
            {error?.strasse && <p className="error">{error.strasse}</p>}

            <LabelInput
                label="PLZ"
                id="plz"
                type="text"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
            />
            {error?.plz && <p className="error">{error.plz}</p>}

            <LabelInput
                label="Ort"
                id="ort"
                type="text"
                value={ort}
                onChange={(e) => setOrt(e.target.value)}
            />
            {error?.ort && <p className="error">{error.ort}</p>}

            {/* Country Selection Dropdown */}
            <label htmlFor="fk_land">Land *</label>
            <select id="fk_land" value={fk_land} onChange={(e) => setLand(e.target.value)}>
                <option value="">-- Wähle ein Land --</option>
                {countries.map((country) => (
                    <option key={country.id_countries} value={country.id_countries}>{country.country}</option>
                ))}
            </select>
            {error?.fk_land && <p className="error">{error.fk_land}</p>}

            <LabelInput
                label="Geschlecht"
                id="geschlecht"
                value={geschlecht}
                onChange={(e) => setGeschlecht(e.target.value)}
            />
            {error?.geschlecht && <p className="error">{error.geschlecht}</p>}

            <LabelInput
                label="Telefon"
                id="telefon"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
            />
            {error?.telefon && <p className="error">{error.telefon}</p>}

            <LabelInput
                label="Handy"
                id="handy"
                value={handy}
                onChange={(e) => setHandy(e.target.value)}
            />
            {error?.handy && <p className="error">{error.handy}</p>}

            <LabelInput
                label="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error?.email && <p className="error">{error.email}</p>}

            <LabelInput
                label="Geburtsdatum *"
                id="birthdate"
                value={birthdate}
                type="date" // Ensures correct format (YYYY-MM-DD) in browser
                onChange={(e) => setBirthdate(e.target.value)}
            />
            {error?.birthdate && <p className="error">{error.birthdate}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default DozentErstellen;