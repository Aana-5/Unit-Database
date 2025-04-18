import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UnitsView from '../components/UnitsView';
import UnitsCreate from '../components/UnitsCreate';
import UnitsDelete from '../components/UnitsDelete';
import UnitsEdit from '../components/UnitsEdit';
import ProductsView from '../components/ProductsView';
import ProductsCreate from '../components/ProductsCreate';
import ProductsEdit from '../components/ProductsEdit';
import ProductsDelete from '../components/ProductsDelete';
import ProductsUnitsView from '../components/ProductsUnitsView';
import ProductsUnitsCreate from '../components/ProductsUnitsCreate';
import ProductsUnitsEdit from '../components/ProductsUnitsEdit';
import ProductsUnitsDelete from '../components/ProductsUnitsDelete';

export default function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/units/view" element={<UnitsView />} />
                    <Route path="/units/create" element={<UnitsCreate />} />
                    <Route path="/units/edit/:id" element={<UnitsEdit />} />
                    <Route path="/units/delete/:id" element={<UnitsDelete />} />
                    <Route path="/products/view" element={<ProductsView />} />
                    <Route path="/products/create" element={<ProductsCreate />} />
                    <Route path="/products/edit/:id" element={<ProductsEdit />} />
                    <Route path="/products/delete/:id" element={<ProductsDelete />} />
                    <Route path="/products-units/view" element={<ProductsUnitsView />} />
                    <Route path="/products-units/create" element={<ProductsUnitsCreate />} />
                    <Route path="/products-units/edit/:id" element={<ProductsUnitsEdit />} />
                    <Route path="/products-units/delete/:id" element={<ProductsUnitsDelete />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
