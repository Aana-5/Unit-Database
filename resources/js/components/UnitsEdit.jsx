import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UnitsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [unit_name, setUnitName] = useState('');
    const [remark, setRemark] = useState('');

    useEffect(() => {
        axios.get(`/units-data/${id}`)
            .then(res => {
                setUnitName(res.data.unit_name);
                setRemark(res.data.remark || '');
            })
            .catch(err => console.error("Error fetching unit:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/units-update/${id}`, { unit_name, remark })
            .then(() => navigate('/units/view'))
            .catch(err => console.error("Error updating unit:", err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Unit</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                <div className="mb-3">
                    <label className="form-label">Unit Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={unit_name}
                        onChange={(e) => setUnitName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Remark</label>
                    <input
                        type="text"
                        className="form-control"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
