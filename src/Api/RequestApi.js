// src/Api/RequestApi.js

let fakeRequests = [
  {
    id: 1,
    project: 'IoT Weather Station',
    purpose: 'Test project',
    startDate: '2026-02-15',
    endDate: '2026-02-20',
    materials: [
      { materialId: 'Arduino Uno R3', quantity: 1 },
      { materialId: 'Multimeter Fluke 87V', quantity: 1 },
    ],
    requestedBy: 'Sarah Student',
    status: 'pending',
    created: '2026-02-15',
    updated: '2026-02-16',
  },
];

export const getRequests = async () => {
  // simulation ديال fetch requests
  return { data: fakeRequests };
};

export const createRequest = async (request) => {
  // simulation ديال submit request
  const newRequest = {
    id: fakeRequests.length + 1,
    ...request,
    requestedBy: 'Current User',
    status: 'pending',
    created: new Date().toISOString().split('T')[0],
    updated: new Date().toISOString().split('T')[0],
  };
  fakeRequests.push(newRequest);
  return { data: newRequest };
};

export const validateStock = async (materials) => {
  // simulation ديال stock validation
  const allAvailable = materials.every((m) => m.quantity > 0);
  return { data: { valid: allAvailable } };
};
