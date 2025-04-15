import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoriesEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category_name, setCategoryName] = useState('');
    const [remark, setRemark] = useState('');

    useEffect(() => {
        axios.get(`/categories-data/${id}`)
            .then(res => {
                setCategoryName(res.data.category_name);
                setRemark(res.data.remark || '');
            })
            .catch(err => console.error("Error fetching category:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/categories-update/${id}`, { category_name, remark })
            .then(() => navigate('/categories/view'))
            .catch(err => console.error("Error updating category:", err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={category_name}
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
