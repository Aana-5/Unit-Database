import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UnitsView() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/units-data')
            .then(res => {
                setUnits(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching units:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Units Table</h2>
                <Link to="/units/create" className="btn btn-primary">
                    + Create Unit
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
                            <th>Unit Name</th>
                            <th>Remark</th>
                            <th>Edits</th>
                            <th>Deletes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(unit => (
                            <tr key={unit.id}>
                                <td>{unit.id}</td>
                                <td>{unit.unit_name}</td>
                                <td>{unit.remark}</td>
                                <td>
                                    <Link to={`/units/edit/${unit.id}`} className="btn btn-warning btn-sm">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/units/delete/${unit.id}`} className="btn btn-danger btn-sm">
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
