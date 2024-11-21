import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const GlobalStateContext = createContext();

// Helper functions for decoding JWT
function decodeBase64Url(base64Url) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  switch (base64.length % 4) {
    case 2:
      base64 += '==';
      break;
    case 3:
      base64 += '=';
      break;
    default:
      break;
  }
  return JSON.parse(atob(base64));
}

export function jwtDecode(token) {
  try {
    // Check if the token is null or undefined
    if (!token) {
      return null;
    }

    // Split the JWT into its three parts (header, payload, signature)
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Decode the payload part (the second part of the token)
    const payload = decodeBase64Url(parts[1]);

    return payload;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}


// Function to decode JWT and check if it's valid
export function tokenValid(token) {
  if (!token) {
    return false;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const payload = decodeBase64Url(parts[1]);
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    if (payload.exp && payload.exp > currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

// Create a Provider component
export const GlobalStateProvider = ({ children }) => {
  // Define global states
  const [token, setToken] = useState(null); // Raw token data
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(`from context, token is: ${storedToken}`);
    if (storedToken) {
      setToken(storedToken);
      setIsTokenValid(tokenValid(storedToken)); // Check validity of the raw token
      console.log(`from context, token is saved`);
    } else {
      setIsTokenValid(false);
      console.log(`from context, token is NOT saved`);
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ token, isTokenValid, setToken, setIsTokenValid }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
