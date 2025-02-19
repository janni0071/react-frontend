import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Lehrbetriebe.css';

function LehrbetriebeLernende() {
    const { data, error, loading, doRequest } = useApi();

    useEffect(() => {
        // Fetch all Lehrbetriebe with associated Lernende
        doRequest({ url: 'https://api.test/lehrbetrieb_lernende', method: 'GET' });
    }, [doRequest]);

    // Sicherstellen, dass groupedData ein leeres Objekt ist, falls data undefined oder null ist
    const groupedData = data?.reduce((acc, entry) => {
        if (!entry) return acc; // Falls entry undefiniert ist, einfach zurückgeben
    
        const { fk_lehrbetrieb, firma, strasse, plz, ort, fk_lernende, vorname, nachname, start, ende, country } = entry;
    
        if (!acc[fk_lehrbetrieb]) {
            acc[fk_lehrbetrieb] = {
                id_lehrbetrieb: fk_lehrbetrieb,
                firma,
                strasse,
                plz,
                ort,
                lernende: []
            };
        }
    
        if (fk_lernende) {
            acc[fk_lehrbetrieb].lernende.push({
                id_lernende: fk_lernende,
                vorname,
                nachname,
                start,
                ende,
                country
            });
        }
    
        return acc;
    }, {}) || {}; // Falls data null oder undefined ist, setzen wir ein leeres Objekt

    return (
        <>
            <h1>Lehrbetriebe mit Lernenden</h1>

            <Link to={`/lehrbetrieb_lernende-erstellen`}>Neuen Lehrbetrieb hinzufügen</Link>

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
                    {Object.values(groupedData).map(({ id_lehrbetrieb, firma, strasse, plz, ort, lernende }) => (
                        <div key={id_lehrbetrieb} className="lehrbetrieb-card">
                            <Link to={`/lehrbetriebe/${id_lehrbetrieb}`}><h6>{firma}</h6></Link>
                            <p>{strasse}, {plz} {ort}</p>
                            {lernende.length > 0 ? (
                                <ul>
                                    {lernende.map(({ id_lernende, vorname, nachname, start, ende, country }) => (
                                        <li key={id_lernende}>
                                            <Link to={`/lernende/${id_lernende}`}>{vorname} {nachname}</Link>
                                            <p>Start: {start} | Ende: {ende}</p>
                                            <p>Land: {country}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Keine Lernenden zugewiesen</p>
                            )}
                            <div className='actions'>
                                <Link to={`/lehrbetrieb-anpassen/${id_lehrbetrieb}`}>Bearbeiten</Link>
                                <p>|</p>
                                <Link className='link' onClick={() => handleDelete(id_lehrbetrieb)}>Löschen</Link>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {!loading && !error && Object.keys(groupedData).length === 0 && (
                <p>Es gibt noch keine Lehrbetriebe mit Lernenden.</p>
            )}
        </>
    );
}

export default LehrbetriebeLernende;
