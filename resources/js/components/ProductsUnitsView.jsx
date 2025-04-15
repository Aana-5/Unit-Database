import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductsUnitsView() {
    const [products, setProducts] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, unitsRes] = await Promise.all([
                    axios.get('/products-data'),
                    axios.get('/units-data'),
                ]);
                setProducts(productsRes.data);
                setUnits(unitsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to get unit name by unit ID
    const getUnitName = (unitId) => {
        const unit = units.find(u => u.id === unitId);
        return unit ? unit.unit_name : 'N/A';
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products with Units</h2>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className="table table-striped table-hover shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            {/* <th>Unit ID</th> */}
                            <th>Unit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.product_name}</td>
                                {/* <td>{product.unit_id || 'N/A'}</td> */}
                                <td>{getUnitName(product.unit_id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
