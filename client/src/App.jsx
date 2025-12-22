import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Users } from './pages/Users';
import { Create } from './pages/Create';
import { Update } from './pages/Update';
import { SingleUser } from './pages/SingleUser';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Users />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },
  {
    path: '/user/:id',
    element: <SingleUser />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
