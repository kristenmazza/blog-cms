import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '/src/App';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import EditPost from '../pages/EditPost';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: '/edit/:slug',
          element: <EditPost />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        { path: '*', element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
