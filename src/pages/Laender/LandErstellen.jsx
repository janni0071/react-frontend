// src/pages/lehrbetriebe/LehrbetriebErstellen.jsx
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import LabelInput from '../../components/LabelInput';
import { useNavigate } from 'react-router-dom';

function LandErstellen() {
    const { loading, error, message, doRequest } = useApi();
    const navigate = useNavigate();

    // Local states for each field in tbl_lehrbetrieb
    const [country, setLand] = useState('');

    // Handler for creating a new Lehrbetrieb
    const handleCreate = async () => {
        const result = await doRequest({
            url: 'https://api.test/laender',
            method: 'POST',
            body: {
                country,
            },
        });

        if (result.success) {
            // Optionally clear fields after success
            setLand('');
            console.log('Created Land:', result.data);
            navigate(`/laender`);
        } else {
            console.error('Create failed:', result.error);
        }
    };

    return (
        <div>
            <h1>Land erstellen</h1>

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {/* {message && <p>{message}</p>} */}
            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p className='error' key={index}>{`${errMsg}`}</p>
                    ))}
                </div>
            )}

            <LabelInput
                label="Land *"
                id="land"
                type="text"
                value={country}
                onChange={(e) => setLand(e.target.value)}
            />
            {error?.firma && <p className="error">{error.firma}</p>}

            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </button>
        </div>
    );
}

export default LandErstellen;
