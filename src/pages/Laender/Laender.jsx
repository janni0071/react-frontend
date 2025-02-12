// src/pages/laender/Laender.jsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Laender.css';

function Laender() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Laender once the component mounts
        doRequest({ url: 'https://api.test/laender', method: 'GET' });
    }, [doRequest]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/laender/${id}`, method: 'DELETE' });
        // Re-fetch the data after deletion
        doRequest({ url: 'https://api.test/laender', method: 'GET' });
    };

    return (
        <>
            <h1>Länder</h1>

            <Link to={`/land-erstellen`}>Neues Land hinzufügen</Link>

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
                        {data.map(({ id_countries, country }) => (
                            <div key={id_countries}>
                                <h2><Link to={`/laender/${id_countries}`}><h6>{country}</h6></Link></h2>
                                <div className='actions'>
                                    <Link to={`/land-anpassen/${id_countries}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <Link className='link' onClick={() => handleDelete(id_countries)}>Löschen</Link>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Länder.</p>
                )
            }
        </>
    );
}

export default Laender;
