import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/pages/Home';
import NotFound from '../Components/pages/NotFound';
import Products from '../Components/Products/Products';
import Cart from '../Components/Cart/Cart';
import ProductDetail from '../Components/Products/ProductDetail';

const router = createBrowserRouter([
     { path: '/', element: <Home /> },
     { path: '/products', element: <Products /> },
     { path: '/cart', element: <Cart /> },
     { path: '/productdetail/:id', element: <ProductDetail /> },
     { path: '*', element: <NotFound /> },
]);

export default router;