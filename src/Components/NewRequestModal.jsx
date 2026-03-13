// src/Components/NewRequestModal.jsx
import { useState, useContext } from 'react';
import MaterialsList from './MaterialsList';
import { ToastContext } from '../Context/ToastContext';
import { createRequest, validateStock } from '../Api/RequestApi';
import useRequests from '../Hooks/useRequests';

export default function NewRequestModal({ close }) {
  const { fetchRequests } = useRequests();
  const { showToast } = useContext(ToastContext);

  // state واحدة لجميع inputs + materials
  const [form, setForm] = useState({
    project: '',
    purpose: '',
    startDate: '',
    endDate: '',
    materials: [{ materialId: '', quantity: 1 }],
  });

  const [validated, setValidated] = useState(false);

  // التحقق من البيانات
  const validateForm = () => {
    if (!form.project) {
      showToast('Project required');
      return false;
    }
    if (!form.purpose) {
      showToast('Purpose required');
      return false;
    }
    if (form.materials.length === 0) {
      showToast('Materials required');
      return false;
    }
    return true;
  };

  // التحقق من stock
  const handleValidate = async () => {
    try {
      const res = await validateStock(form.materials);
      if (res.data.valid) {
        setValidated(true);
        showToast('Stock available');
      } else {
        showToast('Stock unavailable');
      }
    } catch (error) {
      showToast('Validation error');
    }
  };

  // إرسال الطلب
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await createRequest(form);
      showToast('Request sent successfully');
      fetchRequests(); // تحديث list
      close();
    } catch (error) {
      console.error(error);
      showToast('Error sending request');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>New Material Request</h2>
        <button onClick={close}>X</button>
      </div>

      <div className="modal-body">
        <input
          placeholder="Project *"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
        />

        <textarea
          placeholder="Purpose *"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <MaterialsList
          materials={form.materials}
          setMaterials={(newMaterials) => setForm({ ...form, materials: newMaterials })}
        />
      </div>

      <div className="modal-footer">
        <button onClick={handleValidate}>Validate Request</button>
        <button disabled={!validated} onClick={handleSubmit}>
          Submit Request
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
