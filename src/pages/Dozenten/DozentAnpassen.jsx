// src/pages/lehrbetriebe/LehrbetriebAnpassen.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import '../../styles/Dozenten.css';

function DozentAnpassen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, message, doRequest } = useApi();

    // Local state mirrors the tbl_lehrbetrieb columns
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

    // 1) Fetch existing data so we can fill the form fields
    useEffect(() => {
        // We fetch once upon mount (or when `id` changes)
        doRequest({ url: `https://api.test/dozenten/${id}` });
    }, [doRequest, id]);

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

    // 2) Whenever `data` updates, sync local state (if data is loaded successfully)
    useEffect(() => {
        if (data) {
            setVorname(data.vorname || '');
            setNachname(data.nachname || '');
            setStrasse(data.strasse || '');
            setPlz(data.plz || '');
            setOrt(data.ort || '');
            setLand(data.countries || '');
            setGeschlecht(data.geschlecht || '');
            setTelefon(data.telefon || '');
            setHandy(data.handy || '');
            setEmail(data.email || '');
            setBirthdate(data.birthdate || '');
        }
    }, [data]);

    // 3) Handle the PUT request to update the Lehrbetrieb
    const handleUpdate = async () => {
        const result = await doRequest({
            url: `https://api.test/dozenten/${id}`,
            method: 'PUT',
            body: { vorname, nachname, strasse, plz, ort, countries, geschlecht, telefon, handy, email, birthdate },
        });

        if (result.success) {
            console.log('Dozent updated:', result.data);
            // Optionally redirect back to the Lehrbetrieb detail page
            navigate(`/dozenten/${id}`);
        } else {
            console.error('Update failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Dozent anpassen</h1>

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
                label="Vorname"
                id="vorname"
                value={vorname}
                onChange={(e) => setVorname(e.target.value)}
            />

            <LabelInput
                label="Nachname"
                id="nachname"
                value={nachname}
                onChange={(e) => setNachname(e.target.value)}
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

            {/* Country Selection Dropdown */}
            <label htmlFor="fk_land">Land *</label>
            <select id="fk_land" value={fk_land} onChange={(e) => setLand(e.target.value)}>
                <option value="">-- Wähle ein Land --</option>
                {countries.map((country) => (
                    <option key={country.id_countries} value={country.id_countries}>{country.country}</option>
                ))}
            </select>

            <LabelInput
                label="Geschlecht"
                id="geschlecht"
                value={geschlecht}
                onChange={(e) => setGeschlecht(e.target.value)}
            />

            <LabelInput
                label="Telefon"
                id="telefon"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
            />

            <LabelInput
                label="Handy"
                id="handy"
                value={handy}
                onChange={(e) => setHandy(e.target.value)}
            />

            <LabelInput
                label="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <LabelInput
                label="Geburtsdatum"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
            />

            {/* Update button */}
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
    );
}

export default DozentAnpassen;
