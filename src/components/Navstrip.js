import React, { useEffect, useState } from 'react';
import { useGlobalState, tokenValid, jwtDecode } from '../hooks/GlobalStateContext.js';

const UserDisplayer = () => {
  const { token, isTokenValid, setToken, setIsTokenValid } = useGlobalState();
  const [username, setUsername] = useState(null);
  const [iat, setIat] = useState(null);


  // React to changes in the token state
  useEffect(() => {
    console.log('second');
    if (token) {
      console.log('third');
      if (tokenValid(token)) {
        console.log('third one');
        setIsTokenValid(true);
        const tokenData = jwtDecode(token);
        setUsername(tokenData?.username || null);
        setIat(tokenData?.iat || null);
      } else {
        console.log('third two');
        setIsTokenValid(false);
        setUsername(null);
        setIat(null);
        localStorage.setItem('loggedIn', false);
      }
    }
  }, [token, setIsTokenValid, tokenValid, jwtDecode]);

  return (
    <div className="navWrapper">
      <div className="upperStrip">
        <img id='logo' src="/images/Screenshot_2024-10-02_at_14.36.23-removebg-preview.png" alt="logo" />
        <div className="loginSessionDetails">
          <div className="user">
            {isTokenValid && username ? (
              <>
                <p id="loggedInAs">Logged in as: {username}</p>
                {/*<img id="badge" src="/images/badges/badge_of_learning.jpeg" alt="User Badge" />*/}
              </>
            ) : (
              <p id="loggedInAs">Not logged in</p>
            )}
          </div>
          {isTokenValid && iat && (
            <p id="lastLoggedIn">Last login: {new Date(iat * 1000).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDisplayer;
