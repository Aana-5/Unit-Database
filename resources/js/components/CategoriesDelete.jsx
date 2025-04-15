import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoriesDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // Fetch the selected category by ID
    useEffect(() => {
        axios.get('/categories-data')
            .then(res => {
                const foundCategory = res.data.find(c => c.id === parseInt(id));
                if (foundCategory) {
                    setCategory(foundCategory);
                } else {
                    setErrorMsg('Category not found.');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching category:', err);
                setErrorMsg('Something went wrong while fetching data.');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/categories/${id}`)
            .then(() => {
                navigate('/categories/view');
            })
            .catch(err => {
                console.error('Error deleting category:', err);
                setErrorMsg('Failed to delete the category.');
            });
    };

    const handleCancel = () => {
        navigate('/categories/view');
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
                <h3 className="mb-3 text-danger text-center">Are you sure you want to delete this category?</h3>
                <ul className="list-group mb-4">
                    <li className="list-group-item"><strong>ID:</strong> {category.id}</li>
                    <li className="list-group-item"><strong>Category Name:</strong> {category.category_name}</li>
                    <li className="list-group-item"><strong>Remark:</strong> {category.remark}</li>
                </ul>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
}
