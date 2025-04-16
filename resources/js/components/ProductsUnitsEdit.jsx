import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductsUnitsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productRemark, setProductRemark] = useState('');
    const [unitId, setUnitId] = useState('');
    const [units, setUnits] = useState([]);

    useEffect(() => {
        // Fetch the product to edit
        axios.get(`/products-data/${id}`)
            .then(res => {
                setProductName(res.data.product_name);
                setProductRemark(res.data.remark || '');
                setUnitId(res.data.unit_id); // Pre-select the unit
            })
            .catch(err => console.error('Error fetching product:', err));

        // Fetch all available units
        axios.get('/units-data')
            .then(res => setUnits(res.data))
            .catch(err => console.error('Error fetching units:', err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`/products-update/${id}`, {
            product_name: productName,
            remark: productRemark,
            unit_id: Number(unitId),
        })
            .then(() => navigate('/products-units/view'))
            .catch(err => console.error('Error updating product:', err));
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
                        value={productRemark}
                        onChange={(e) => setProductRemark(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Unit</label>
                    <select
                        className="form-select"
                        value={unitId}
                        onChange={(e) => setUnitId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Unit --</option>
                        {units.map(unit => (
                            <option key={unit.id} value={unit.id}>
                                {unit.unit_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </div>
    );
}
