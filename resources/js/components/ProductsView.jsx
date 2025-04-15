import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductsView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/products-data')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products Table</h2>
                <Link to="/products/create" className="btn btn-success">
                    + Add Product
                </Link>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className="table table-striped table-hover shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Remark</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.remark}</td>
                                <td>
                                    <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/products/delete/${product.id}`} className="btn btn-danger btn-sm">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
