// src/pages/lehrbetriebe/Lehrbetriebe.js

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Kurse.css';

function Kurse() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Lehrbetriebe once the component mounts
        doRequest({ url: 'https://api.test/kurse', method: 'GET' });
    }, [doRequest]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/kurse/${id}`, method: 'DELETE' });
        // Re-fetch the data after deletion
        doRequest({ url: 'https://api.test/kurse', method: 'GET' });
    };

    return (
        <>
            <h1>Kurse</h1>

            <Link to={`/kurs-erstellen`}>Neuen Kurs hinzufügen</Link>

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
                        {data.map(({ id_kurs, kursnummer, kursthema, inhalt, fk_dozent, startdatum, enddatum, dauer }) => (
                            <div key={id_kurs}>
                                <h2><Link to={`/kurse/${id_kurs}`}>{kursnummer} {kursthema}</Link></h2>
                                <p className='inhalt'>{inhalt || 'Kein Inhalt vorhanden, in diesem Kurs wird gechillt!! (￣o￣) . z Z'}</p>
                                <p className='fk_dozent'>{fk_dozent || 'Kein Dozent vorhanden, das ist eine Selbsthilfegruppe.'}</p>
                                <p className='startdatum'>{startdatum || 'Kein Startdatum vorhanden, wir fangen einfach an wenn alle da sind oder so b(￣▽￣)d'}</p>
                                <p className='enddatum'>{enddatum || 'Kein Enddatum vorhanden, wir gehen einfach sobald es langweilig wird ( •̀ ω •́ )y'}</p>
                                <p className='dauer'>{dauer || 'Keine Dauer vorhanden, sehen wir dann ja hinterher 👈(ﾟヮﾟ👈)'}</p>
                                <div className='actions'>
                                    <Link to={`/kurs-anpassen/${id_kurs}`}>Bearbeiten</Link>
                                    <p>|</p>
                                    <Link className='link' onClick={() => handleDelete(id_kurs)}>Löschen</Link>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
            {!loading && !error && !data?.length &&
                (
                    <p>Es gibt noch keine Kurse.</p>
                )
            }
        </>
    );
}

export default Kurse;
