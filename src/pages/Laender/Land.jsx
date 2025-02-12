// src/pages/Laender/Land.jsx

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import '../../styles/Laender.css';

const Land = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, doRequest } = useApi();

    // Fetch the Land once the component mounts or the id changes
    useEffect(() => {
        doRequest({ url: `https://api.test/laender/${id}` });
    }, [doRequest, id]);

    const handleDelete = async (id) => {
        await doRequest({ url: `https://api.test/laender/${id}`, method: 'DELETE' });
        // Redirect to /Laender after deletion
        navigate('/laender');
    };

    return (
        <>
            <h1>Land | Detailansicht</h1>

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
                <div key={data.id_countries}>
                    <h2>{data.country}</h2>
                    <div className='actions'>
                        <Link to={`/land-anpassen/${data.id_countries}`}>Bearbeiten</Link>
                        <p>|</p>
                        <Link className='link' onClick={() => handleDelete(data.id_countries)}>Löschen</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Land;