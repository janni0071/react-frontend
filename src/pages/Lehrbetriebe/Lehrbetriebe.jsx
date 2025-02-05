// src/pages/lehrbetriebe/Lehrbetriebe.js

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function Lehrbetriebe() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Lehrbetriebe once the component mounts
        doRequest({ url: 'https://api.test/lehrbetriebe', method: 'GET' });
    }, [doRequest]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/lehrbetriebe/${id}`, method: 'DELETE' });
        // Re-fetch the data after deletion
        doRequest({ url: 'https://api.test/lehrbetriebe', method: 'GET' });
    };

    return (
        <>
            <h1>Lehrbetriebe</h1>

            <Link to={`/lehrbetrieb-erstellen`}>Neuen Lehrbetrieb hinzufügen</Link>

            {error && Object.keys(error).length > 0 && (
                <div>
                    {Object.entries(error).map(([field, errMsg], index) => (
                        <p key={index}>{`${field}: ${errMsg}`}</p>
                    ))}
                </div>
            )}

            {loading &&
                <div className="spinner">
                    <div></div>
                </div>
            }
            {!loading && !error && data?.length &&
                (
                    <>
                        {data.map(({ id_lehrbetrieb, firma, strasse, plz, ort }) => (
                            <div key={id_lehrbetrieb}>
                                <h2><Link to={`/lehrbetriebe/${id_lehrbetrieb}`}>{firma}</Link></h2>
                                <p className='street'>{strasse || 'Keine Strasse vorhanden'}</p>
                                <div className='address'>
                                    <span>{plz || 'Keine PLZ vorhanden'}</span>
                                    <span>&nbsp;</span>
                                    <span>{ort || 'Kein Ort vorhanden'}</span>
                                </div>
                                <div className='actions'>
                                    <Link to={`/lehrbetrieb-anpassen/${id_lehrbetrieb}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <Link className='link' onClick={() => handleDelete(id_lehrbetrieb)}>Löschen</Link>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Lehrbetriebe.</p>
                )
            }
        </>
    );
}

export default Lehrbetriebe;
