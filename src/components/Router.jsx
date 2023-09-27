import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '/src/App';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
// import Post from '../pages/Post';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        // {
        //   path: '/posts/:slug',
        //   element: <Post />,
        // },
        { path: '*', element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
