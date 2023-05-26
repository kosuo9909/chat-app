import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Home from './components/Main/Home';
import { Query, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <RouterProvider router={router}></RouterProvider>{' '}
    </QueryClientProvider>
  );
}

export default App;
