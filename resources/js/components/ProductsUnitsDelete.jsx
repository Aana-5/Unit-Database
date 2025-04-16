import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductsUnitsDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios.get(`/products-data/${id}`)
            .then(res => {
                const productData = res.data;
                if (productData) {
                    // Fetch unit name using unit_id
                    axios.get(`/units-data/${productData.unit_id}`)
                        .then(unitRes => {
                            productData.unit_name = unitRes.data.unit_name;
                            setProduct(productData);
                            setLoading(false);
                        })
                        .catch(() => {
                            productData.unit_name = 'N/A';
                            setProduct(productData);
                            setLoading(false);
                        });
                } else {
                    setErrorMsg('Product not found.');
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setErrorMsg('Something went wrong while fetching data.');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/products/${id}`)
            .then(() => {
                navigate('/products-units/view');
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                setErrorMsg('Failed to delete the product.');
            });
    };

    const handleCancel = () => {
        navigate('/products-units/view');
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (errorMsg) {
        return <div className="alert alert-danger mt-5 text-center">{errorMsg}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="mb-3 text-danger text-center">Are you sure you want to delete this product?</h3>
                <ul className="list-group mb-4">
                    <li className="list-group-item"><strong>ID:</strong> {product.id}</li>
                    <li className="list-group-item"><strong>Product Name:</strong> {product.product_name}</li>
                    <li className="list-group-item"><strong>Remark:</strong> {product.remark || 'N/A'}</li>
                    <li className="list-group-item"><strong>Category Name:</strong> {product.category_name || 'N/A'}</li>
                    <li className="list-group-item"><strong>Unit:</strong> {product.unit_name || 'N/A'}</li>
                </ul>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
}
