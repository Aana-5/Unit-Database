import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UnitsDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios.get('/units-data')
            .then(res => {
                const foundUnit = res.data.find(u => u.id === parseInt(id));
                if (foundUnit) {
                    setUnit(foundUnit);
                } else {
                    setErrorMsg('Unit not found.');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching unit:', err);
                setErrorMsg('Something went wrong while fetching data.');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/units/${id}`)
            .then(() => {
                navigate('/units/view');
            })
            .catch(err => {
                console.error('Error deleting unit:', err);
                setErrorMsg('Failed to delete the unit.');
            });
    };

    const handleCancel = () => {
        navigate('/units/view');
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (errorMsg) {
        return <div className="alert alert-danger mt-5 text-center">{errorMsg}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="mb-3 text-danger text-center">Are you sure you want to delete this unit?</h3>
                <ul className="list-group mb-4">
                    <li className="list-group-item"><strong>ID:</strong> {unit.id}</li>
                    <li className="list-group-item"><strong>Unit Name:</strong> {unit.unit_name}</li>
                    <li className="list-group-item"><strong>Remark:</strong> {unit.remark}</li>
                </ul>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
}
