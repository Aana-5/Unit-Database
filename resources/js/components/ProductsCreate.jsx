import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductsCreate() {
    const [productName, setProductName] = useState('');
    const [remark, setRemark] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName.trim()) {
            setErrorMsg('Product Name is required.');
            return;
        }

        try {
            await axios.post('/products-store', {
                product_name: productName,
                remark: remark,
            });

            setSuccessMsg('Product added successfully! 🍎🎉');
            setErrorMsg('');
            setProductName('');
            setRemark('');
            navigate('/products/view');
        } catch (error) {
            console.error('Error creating product:', error);
            setErrorMsg('Failed to create product. Please try again.');
            setSuccessMsg('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Product</h2>

            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Product Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
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

                <button type="submit" className="btn btn-success w-100">
                    Submit Product
                </button>
            </form>
        </div>
    );
}
