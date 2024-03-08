import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { Mode, applyMode } from '@cloudscape-design/global-styles';
import { RouterProvider } from 'react-router-dom';
import Router from './Router.tsx';
import AgentContextProvider from './context/AgentContextProvider.tsx';

window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  ? applyMode(Mode.Dark)
  : applyMode(Mode.Light);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AgentContextProvider>
      <RouterProvider router={Router} />
    </AgentContextProvider>
  </React.StrictMode>
);
