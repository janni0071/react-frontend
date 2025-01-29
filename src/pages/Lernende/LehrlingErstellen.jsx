// src/pages/lehrbetriebe/LehrbetriebErstellen.jsx
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function LehrlingErstellen() {
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
    const [email_privat, setEmailPrivat] = useState('');
    const [birthdate, setBirthdate] = useState('');

    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/lernende',
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
                email_privat,
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
            setGeschlecht('');
            setTelefon('');
            setHandy('');
            setEmail('');
            setEmailPrivat('');
            setBirthdate('');
            console.log('Created Lehrling:', result.data);
            navigate(`/lernende`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Lehrling erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {message && <p>{message}</p>}
            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p className='error' key={index}>{`${errMsg}`}</p>
                    ))}
                </div>
            )}

            <LabelInput
                label="Vorname"
                id="vorname"
                value={vorname}
                onChange={(e) => setVorname(e.target.value)}
            />
            {/* {error?.vorname && <p className="error">{error.vorname}</p>} */}

            <LabelInput
                label="Nachname"
                id="nachname"
                value={nachname}
                onChange={(e) => setNachname(e.target.value)}
            />
            {/* {error?.nachname && <p className="error">{error.nachname}</p>} */}

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

            <LabelInput
                label="Land"
                id="fk_land"
                type="number"
                value={fk_land}
                onChange={(e) => setLand(e.target.value)}
            />
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
                label="Email Privat"
                id="email_privat"
                value={email_privat}
                onChange={(e) => setEmailPrivat(e.target.value)}
            />
            {error?.email_privat && <p className="error">{error.email_privat}</p>}

            <LabelInput
                label="Geburtsdatum"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
            />
            {error?.birthdate && <p className="error">{error.birthdate}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default LehrlingErstellen;
