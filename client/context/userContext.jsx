import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!userData) {
      axios.get('/profile').then(({ data }) => {
        setUserData(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
