import MainLayout from './layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import ProductDetails from './pages/productDetails/ProductDetails';
import ProtectedRouter from './components/ProtectedRouter';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import ProfileLayout from './pages/profile/ProfileLayout';
import Shop from './pages/shop/Shop';
import ForgotPassword from './pages/resetPassword/ForgotPassword';
import Contact from './pages/contact/Contact'
import ResetPassword from './pages/resetPassword/RestPassword'
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,
      element: <Home /> 
        },
      {
       path: '/register', 
       element: <Register /> 
      },
      { path: '/shop', 
        element: <Shop /> 
      },
      {
         path: '/cart',
         element: <ProtectedRouter><Cart /></ProtectedRouter>
         },
      { 
        path: '/checkout',
         element: <ProtectedRouter><Checkout /></ProtectedRouter>
         },
      { 
        path: '/checkout-success',
         element: <ProtectedRouter><CheckoutSuccess /></ProtectedRouter> },
      { 
        path: '/profile',
         element: <ProtectedRouter><ProfileLayout /></ProtectedRouter> },
      { 
        path: '/login',
         element: <Login />
         },
         { 
        path: '/reset-password',
         element: <ResetPassword />
         },
      { 
        path: '/forgot-password',
         element: <ForgotPassword /> },
      { 
        path: '/products/:id',
         element: <ProductDetails /> 
        },{
          path:'/contact',
          element:<Contact/>
        }
    ],
  },
]);

export default router;