import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Account/Login';
import Register from './components/Account/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
