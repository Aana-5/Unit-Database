import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductCreateForm() {
    const [productName, setProductName] = useState('');
    const [productRemark, setProductRemark] = useState('');
    const [unitRemark, setUnitRemark] = useState('');
    const [unitName, setUnitName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !productRemark || !unitName || !unitRemark) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const unitRes = await axios.post('/units-store', {
                unit_name: unitName,
                remark: unitRemark,
            });
            const newUnitId = unitRes.data.id;

            await axios.post('/products-store', {
                product_name: productName,
                remark: productRemark,
                unit_id: newUnitId,
            });

            navigate('/products-units/view');
        } catch (err) {
            console.error('Error creating unit or product:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productRemark" className="form-label">Product Remark</label>
                    <input
                        type="text"
                        id="productRemark"
                        className="form-control"
                        value={productRemark}
                        onChange={(e) => setProductRemark(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="unitName" className="form-label">Unit Name</label>
                    <input
                        type="text"
                        id="unitName"
                        className="form-control"
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="unitRemark" className="form-label">Unit Remark</label>
                    <input
                        type="text"
                        id="unitRemark"
                        className="form-control"
                        value={unitRemark}
                        onChange={(e) => setUnitRemark(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
    );
}
