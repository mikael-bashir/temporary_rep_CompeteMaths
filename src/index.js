import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App.js';

// Get the root element
const rootElement = document.getElementById('root');
// Create a root using the new API
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);

