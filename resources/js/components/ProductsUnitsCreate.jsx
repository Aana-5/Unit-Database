import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductCreateForm() {
    const [productName, setProductName] = useState('');
    const [productRemark, setProductRemark] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [unitName, setUnitName] = useState('');

    const [categoryList, setCategoryList] = useState([]);
    const [unitNamesList, setUnitNamesList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch unique category names
        axios.get('/products-data')
            .then(res => {
                const uniqueCategories = [...new Set(res.data.map(p => p.category_name))].filter(Boolean);
                setCategoryList(uniqueCategories);
            })
            .catch(err => console.error('Error fetching categories:', err));

        // Fetch unit names
        axios.get('/units-data')
            .then(res => {
                const uniqueUnits = [...new Set(res.data.map(u => u.unit_name))];
                setUnitNamesList(uniqueUnits);
            })
            .catch(err => console.error('Error fetching unit names:', err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !productRemark || !categoryName || !unitName) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const unitRes = await axios.get('/units-data');
            const selectedUnit = unitRes.data.find(u => u.unit_name === unitName);

            let unitId;

            if (selectedUnit) {
                unitId = selectedUnit.id;
            } else {
                // If unit doesn't exist, create a new one
                const newUnit = await axios.post('/units-store', {
                    unit_name: unitName,
                    remark: '',
                });
                unitId = newUnit.data.id;
            }

            await axios.post('/products-store', {
                product_name: productName,
                remark: productRemark,
                category_name: categoryName,
                unit_id: unitId,
            });

            navigate('/products-units/view');
        } catch (err) {
            console.error('Error creating product:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Product Name */}
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

                {/* Product Remark (Text Input) */}
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

                {/* Category Name Dropdown */}
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                    <select
                        id="categoryName"
                        className="form-select"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categoryList.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Unit Name Dropdown */}
                <div className="mb-3">
                    <label htmlFor="unitName" className="form-label">Unit Name</label>
                    <select
                        id="unitName"
                        className="form-select"
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        required
                    >
                        <option value="">Select Unit</option>
                        {unitNamesList.map((unit, index) => (
                            <option key={index} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
    );
}
