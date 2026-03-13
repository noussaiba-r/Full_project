import { createContext, useState, useEffect } from 'react';
import { getRequests } from '../Api/RequestApi';

export const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await getRequests();

      setRequests(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <RequestContext.Provider value={{ requests, loading, fetchRequests }}>
      {children}
    </RequestContext.Provider>
  );
}
