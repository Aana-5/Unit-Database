import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CategoriesView() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/categories-data')
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categories Table</h2>
                <Link to="/categories/create" className="btn btn-primary">
                    + Create Category
                </Link>
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
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Remark</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.category_name}</td>
                                <td>{category.remark}</td>
                                <td>
                                    <Link to={`/categories/edit/${category.id}`} className="btn btn-warning btn-sm">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/categories/delete/${category.id}`} className="btn btn-danger btn-sm">
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
