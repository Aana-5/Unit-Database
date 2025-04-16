import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product_name, setProductName] = useState('');
    const [remark, setRemark] = useState('');
    const [category_name, setCategoryName] = useState('');

    useEffect(() => {
        axios.get(`/products-data/${id}`)
            .then(res => {
                setProductName(res.data.product_name);
                setRemark(res.data.remark || '');
                setCategoryName(res.data.category_name || '');
            })
            .catch(err => console.error("Error fetching product:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/products-update/${id}`, { product_name, remark, category_name })
            .then(() => navigate('/products/view'))
            .catch(err => console.error("Error updating product:", err));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
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
                <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={category_name}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Update Product</button>
            </form>
        </div>
    );
}
