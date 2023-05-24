import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';

function App() {
  const router = createBrowserRouter([{ path: '/', element: <Navigation /> }]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
