// src/pages/Dozenten/Dozenten.jsx

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Dozenten.css';

function Dozenten() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Dozenten once the component mounts
        doRequest({ url: 'https://api.test/dozenten', method: 'GET' });
    }, [doRequest]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/dozenten/${id}`, method: 'DELETE' });
        // Re-fetch the data after deletion
        doRequest({ url: 'https://api.test/dozenten', method: 'GET' });
    };

    return (
        <>
            <h1>Dozenten</h1>

            <Link to={`/dozent-erstellen`}>Neuen Dozenten hinzufügen</Link>

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
                        {data.map(({ id_dozent, vorname, nachname, strasse, plz, ort, fk_land, geschlecht, telefon, handy, email, birthdate }) => (
                            <div key={id_dozent}>
                                <h2><Link to={`/dozenten/${id_dozent}`}>{vorname} {nachname}</Link></h2>
                                <p className='geschlecht'>{geschlecht || 'Kein Geschlecht vorhanden, diese Person ist ein ALIEN OMG (⊙_(⊙_⊙)_⊙)'}</p>
                                <p className='birthdate'>{birthdate || 'Kein Geburtsdatum vorhanden, diese Person wurde im Labor zusammengebastelt.'}</p>
                                <p className='street'>{strasse || 'Keine Strasse vorhanden, diese Person lebt als Eremit fernab von jeglicher Zivilisation (⊙ˍ⊙)'}</p>
                                <div className='address'>
                                    <span>{plz || 'Keine PLZ vorhanden, Post war gestern!'}</span>
                                    <span>&nbsp;</span>
                                    <span>{ort || 'Kein Ort vorhanden, diese Person will NICHT gefunden werden!!!'}</span>
                                </div>
                                <p className='land'>{fk_land || 'Kein Land vorhanden, diese Person ist entweder Pirat oder wohnt in der Antarktis...oder beides.'}</p>
                                <p className='telefon'>{telefon || 'Wir leben im 21. Jahrhundert, KEINE SAU hat Festnetz :P'}</p>
                                <p className='handy'>{handy || 'Kein Handy vorhanden... Offenbar ist JEMAND noch nicht im aktuellen Jahrhundert angekommen w(ﾟДﾟ)w'}</p>
                                <p className='email'>{email || 'Keine Email vorhanden, im Lehrbetrieb wird nur über Whatsapp-Gruppen kommuniziert.'}</p>
                                <div className='actions'>
                                    <Link to={`/dozent-anpassen/${id_dozent}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <Link className='link' onClick={() => handleDelete(id_dozent)}>Löschen</Link>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Dozenten.</p>
                )
            }
        </>
    );
}

export default Dozenten;
