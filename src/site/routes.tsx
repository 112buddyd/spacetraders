import App from './App';
import Home from './Home';
import AgentData from './pages/AgentData';
import Register from './pages/Register';
import Location from './pages/Location';

export const routes = [
  {
    path: '/',
    element: <App />,
    label: 'Space Trader',
    children: [
      {
        path: '/home',
        element: <Home />,
        label: 'Home',
      },
      {
        path: '/register',
        element: <Register />,
        label: 'Register',
      },
      {
        path: '/agentdata',
        element: <AgentData />,
        label: 'AgentData',
      },
      {
        path: '/location',
        element: <Location />,
        label: 'Location Lookup',
      },
    ],
  },
];
