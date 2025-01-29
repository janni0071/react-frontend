// src/pages/lehrbetriebe/LehrbetriebErstellen.jsx
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';

function LehrbetriebErstellen() {
    const { loading, error, message, doRequest } = useApi();

    // Local states for each field in tbl_lehrbetrieb
    const [firma, setFirma] = useState('');
    const [strasse, setStrasse] = useState('');
    const [plz, setPlz] = useState('');
    const [ort, setOrt] = useState('');

    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/lehrbetriebe',
            method: 'POST',
            body: {
                firma,
                strasse,
                plz,
                ort,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setFirma('');
            setStrasse('');
            setPlz('');
            setOrt('');
            console.log('Created Lehrbetrieb:', result.data);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Lehrbetrieb erstellen</h1>

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
                label="Firma"
                id="firma"
                type="text"
                value={firma}
                onChange={(e) => setFirma(e.target.value)}
            />
            {/* {error?.firma && <p className="error">{error.firma}</p>} */}

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

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default LehrbetriebErstellen;
