import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UnitsView from '../components/UnitsView';
import UnitsCreate from '../components/UnitsCreate';
import UnitsDelete from '../components/UnitsDelete';
import UnitsEdit from '../components/UnitsEdit';

export default function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/units/view" element={<UnitsView />} />
                    <Route path="/units/create" element={<UnitsCreate />} />
                    <Route path="/units/edit/:id" element={<UnitsEdit />} />
                    <Route path="/units/delete/:id" element={<UnitsDelete />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
