import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Home from './components/Main/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatRoom from './components/Main/ChatRoom';

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
        { path: 'room/:roomId', element: <ChatRoom /> },
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
