// src/Hooks/useRequests.js
import { useContext } from 'react';
import { RequestContext } from '../Context/RequestContext';

export default function useRequests() {
  // هاد hook كيرجع context ديال requests + fetchRequests
  return useContext(RequestContext);
}
