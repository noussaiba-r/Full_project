// src/Pages/MyRequestsPage.jsx
import { useState } from 'react';
import NewRequestModal from '../Components/NewRequestModal';
import RequestCard from '../Components/RequestCard';
import { fetchRequestsFake, createRequestFake } from '../Api/fakeApi';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState(fetchRequestsFake());
  const [showModal, setShowModal] = useState(false);

  const addRequest = (newReq) => {
    const reqWithId = createRequestFake(newReq);
    setRequests([...requests, reqWithId]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
        disabled={requests.length >= 5}
      >
        Create Request
      </button>

      <div className="grid gap-4">
        {requests.map((r) => (
          <RequestCard key={r.id} request={r} />
        ))}
      </div>

      {showModal && <NewRequestModal close={() => setShowModal(false)} onAddRequest={addRequest} />}
    </div>
  );
}
