// src/pages/lehrbetriebe/ReadLehrbetrieb.js

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Dozenten.css';

const Dozent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, doRequest } = useApi();

    // Fetch the Lehrbetrieb once the component mounts or the id changes
    useEffect(() => {
        doRequest({ url: `https://api.test/dozenten/${id}` });
    }, [doRequest, id]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/dozenten/${id}`, method: 'DELETE' });
        // Redirect to /Lehrbetriebe after deletion
        navigate('/dozenten');
    };

    return (
        <>
            <h1>Dozent | Detailansicht</h1>

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
                <div key={data.id_dozent}>
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
                    <p className='birthdate'>{data.birthdate || 'Kein Geburtsdatum vorhanden, diese Person wurde im Labor zusammengebastelt.'}</p>
                    <div className='actions'>
                        <Link to={`/dozent-anpassen/${data.id_dozent}`}>Bearbeiten</Link>
                        <p>|</p>
                        <Link className='link' onClick={() => handleDelete(data.id_dozent)}>Löschen</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dozent;