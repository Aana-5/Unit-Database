import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CategoriesCreate() {
    const [categoryName, setCategoryName] = useState('');
    const [remark, setRemark] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setErrorMsg('Category Name is required.');
            return;
        }

        try {
            await axios.post('/categories-store', {
                category_name: categoryName,
                remark: remark,
            });
            setSuccessMsg('Category created successfully! 🎉');
            setErrorMsg('');
            setCategoryName('');
            setRemark('');
            navigate('/categories/view');
        } catch (error) {
            console.error('Error creating category:', error);
            setErrorMsg('Failed to create category. Please try again.');
            setSuccessMsg('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create New Category</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Category Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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
                    Submit Category
                </button>
            </form>
        </div>
    );
}
