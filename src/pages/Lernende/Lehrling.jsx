// src/pages/lehrbetriebe/ReadLehrbetrieb.js

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lernende.css';

const Lehrling = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, doRequest } = useApi();

    // Fetch the Lehrbetrieb once the component mounts or the id changes
    useEffect(() => {
        doRequest({ url: `https://api.test/lernende/${id}` });
    }, [doRequest, id]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/lernende/${id}`, method: 'DELETE' });
        // Redirect to /Lehrbetriebe after deletion
        navigate('/lernende');
    };

    return (
        <>
            <h1>Lehrling | Detailansicht</h1>

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
                <div key={data.id_lernende}>
                    <h2>{data.vorname} {data.nachname}</h2>
                    <p className='street'>{data.strasse || 'Keine Strasse vorhanden, diese Person lebt als Eremit fernab von jeglicher Zivilisation (⊙ˍ⊙)'}</p>
                    <div className='address'>
                        <span>{data.plz || 'Keine PLZ vorhanden, Post war gestern!'}</span>
                        <span>&nbsp;</span>
                        <span>{data.ort || 'Kein Ort vorhanden, diese Person will NICHT gefunden werden!!!'}</span>
                    </div>
                    <p className='geschlecht'>{data.geschlecht || 'Kein Geschlecht vorhanden, diese Person ist ein ALIEN OMG (⊙_(⊙_⊙)_⊙)'}</p>
                    <p className='telefon'>{data.telefon || 'Wir leben im 21. Jahrhundert, KEINE SAU hat Festnetz :P'}</p>
                    <p className='handy'>{data.handy || 'Kein Handy vorhanden... Offenbar ist JEMAND noch nicht im aktuellen Jahrhundert angekommen w(ﾟДﾟ)w'}</p>
                    <p className='email'>{data.email || 'Keine Email vorhanden, im Lehrbetrieb wird nur über Whatsapp-Gruppen kommuniziert.'}</p>
                    <p className='email_privat'>{data.email_privat || 'Keine private Email vorhanden, jemand will wohl absolut KEINE Newsletter bekommen.'}</p>
                    <p className='birthdate'>{data.birthdate || 'Kein Geburtsdatum vorhanden, diese Person wurde im Labor zusammengebastelt.'}</p>
                    <div className='actions'>
                        <Link to={`/lehrling-anpassen/${data.id_lernende}`}>Bearbeiten</Link>
                        <p>|</p>
                        <button className='link' onClick={() => handleDelete(data.id_lernende)}><span>Löschen</span></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Lehrling;