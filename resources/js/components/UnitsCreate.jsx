import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UnitsCreate() {
    const [unitName, setUnitName] = useState('');
    const [remark, setRemark] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!unitName.trim()) {
            setErrorMsg('Unit Name is required.');
            return;
        }

        try {
            await axios.post('/units-store', {
                unit_name: unitName,
                remark: remark,
            });

            setSuccessMsg('Unit created successfully! 🎉');
            setErrorMsg('');
            setUnitName('');
            setRemark('');
            navigate('/units/view');
        } catch (error) {
            console.error('Error creating unit:', error);
            setErrorMsg('Failed to create unit. Please try again.');
            setSuccessMsg('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create New Unit</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Unit Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        value={unitName}
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

                <button type="submit" className="btn btn-primary w-100">
                    Create Unit
                </button>
            </form>
        </div>
    );
}
