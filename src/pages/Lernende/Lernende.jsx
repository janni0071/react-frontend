// src/pages/lehrbetriebe/Lehrbetriebe.js

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lernende.css';

function Lernende() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Lehrbetriebe once the component mounts
        doRequest({ url: 'https://api.test/lernende', method: 'GET' });
    }, [doRequest]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/lernende/${id}`, method: 'DELETE' });
        // Re-fetch the data after deletion
        doRequest({ url: 'https://api.test/lernende', method: 'GET' });
    };

    return (
        <>
            <h1>Lernende</h1>

            <Link to={`/lehrling-erstellen`}>Neuen Lernenden hinzufügen</Link>

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
                        {data.map(({ id_lernende, vorname, nachname, strasse, plz, ort, fk_land, geschlecht, telefon, handy, email, email_privat, birthdate }) => (
                            <div key={id_lernende}>
                                <h2><Link to={`/lernende/${id_lernende}`}>{vorname} {nachname}</Link></h2>
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
                                <p className='email_privat'>{email_privat || 'Keine private Email vorhanden, jemand will wohl absolut KEINE Newsletter bekommen.'}</p>
                                <div className='actions'>
                                    <Link to={`/lehrling-anpassen/${id_lernende}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <Link className='link' onClick={() => handleDelete(id_lernende)}>Löschen</Link>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Lernenden.</p>
                )
            }
        </>
    );
}

export default Lernende;
