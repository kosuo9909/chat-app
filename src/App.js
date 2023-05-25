import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Account/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [{ path: 'login', element: <Login /> }],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
