import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function KurseLernende() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Kurse with associated Lernende
        doRequest({ url: 'https://api.test/kurse_lernende', method: 'GET' });
    }, [doRequest]);

    // Sicherstellen, dass groupedData ein leeres Objekt ist, falls data undefined oder null ist
    const groupedData = data?.reduce((acc, entry) => {
        if (!entry) return acc; // Falls entry undefiniert ist, einfach zurückgeben
    
        const { fk_kurs, kursnummer, kursthema, inhalt, dozent, fk_lernende, vorname, nachname, role, country } = entry;
    
        if (!acc[fk_kurs]) {
            acc[fk_kurs] = {
                id_kurs: fk_kurs,
                kursnummer,
                kursthema,
                inhalt,
                dozent,
                lernende: []
            };
        }
    
        if (fk_lernende) {
            acc[fk_kurs].lernende.push({
                id_lernende: fk_lernende,
                vorname,
                nachname,
                role,
                country
            });
        }
    
        return acc;
    }, {}) || {}; // Falls data null oder undefined ist, setzen wir ein leeres Objekt

    return (
        <>
            <h1>Kurse mit Lernenden</h1>

            <Link to={`/kurse_lernende-erstellen`}>Neuen Kurs hinzufügen</Link>

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

            {!loading && !error && Object.keys(groupedData).length > 0 && (
                <>
                    {Object.values(groupedData).map(({ id_kurs, kursnummer, kursthema, inhalt, dozent, lernende }) => (
                        <div key={id_kurs} className="kurs-card">
                            <Link to={`/kurse/${id_kurs}`}><h6>{kursnummer} {kursthema}</h6></Link>
                            <p>{inhalt} {dozent}</p>
                            {lernende.length > 0 ? (
                                <ul>
                                    {lernende.map(({ id_lernende, vorname, nachname, role, country }) => (
                                        <li key={id_lernende}>
                                            <Link to={`/lernende/${id_lernende}`}>{vorname} {nachname}</Link>
                                            <p>Note: {role}</p>
                                            <p>Land: {country}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Keine Lernenden zugewiesen</p>
                            )}
                            <div className='actions'>
                                <Link className='link' onClick={() => handleDelete(id_kurs)}>Löschen</Link>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {!loading && !error && Object.keys(groupedData).length === 0 && (
                <p>Es gibt noch keine Kurse mit Lernenden.</p>
            )}
        </>
    );
}

export default KurseLernende;
