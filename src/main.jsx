import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';


// Enable the future flag for React Router
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
       
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enables React.startTransition wrapping
      v7_relativeSplatPath: true, // Changes relative splat path resolution
      v7_fetcherPersist: true, // Changes fetcher persistence behavior
      v7_normalizeFormMethod: true, // Normalizes formMethod to uppercase
      v7_partialHydration: true, // Updates RouterProvider hydration behavior
      v7_skipActionErrorRevalidation: true, // Changes revalidation after 4xx/5xx responses
    },
  }
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
