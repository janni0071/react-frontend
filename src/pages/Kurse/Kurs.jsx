// src/pages/Kurse/Kurs.jsx

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Kurse.css';

const Kurs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, doRequest } = useApi();

    // Fetch the Kurs once the component mounts or the id changes
    useEffect(() => {
        doRequest({ url: `https://api.test/kurse/${id}` });
    }, [doRequest, id]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/kurse/${id}`, method: 'DELETE' });
        // Redirect to /Kurse after deletion
        navigate('/kurse');
    };

    return (
        <>
            <h1>Kurs | Detailansicht</h1>

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
            {!loading && !error && data && (
                <div key={data.id_kurs}>
                    <h2>{data.kursnummer} {data.kursthema}</h2>
                    <p className='inhalt'>{data.inhalt || 'Kein Inhalt vorhanden, in diesem Kurs wird gechillt!! (￣o￣) . z Z'}</p>
                    <p className='fk_dozent'>{data.fk_dozent || 'Kein Dozent vorhanden, das ist eine Selbsthilfegruppe.'}</p>
                    <p className='startdatum'>{data.startdatum || 'Kein Startdatum vorhanden, wir fangen einfach an wenn alle da sind oder so b(￣▽￣)d'}</p>
                    <p className='enddatum'>{data.enddatum || 'Kein Enddatum vorhanden, wir gehen einfach sobald es langweilig wird ( •̀ ω •́ )y'}</p>
                    <p className='dauer'>{data.dauer || 'Keine Dauer vorhanden, sehen wir dann ja hinterher 👈(ﾟヮﾟ👈)'}</p>
                    <div className='actions'>
                        <Link to={`/kurs-anpassen/${data.id_kurs}`}>Bearbeiten</Link>
                        <p>|</p>
                        <Link className='link' onClick={() => handleDelete(data.id_kurs)}>Löschen</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Kurs;