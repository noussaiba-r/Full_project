// src/Components/MaterialsList.jsx
export default function MaterialsList({ materials, setMaterials }) {
  const addMaterial = () => {
    setMaterials([...materials, { materialId: '', quantity: 1 }]);
  };

  const removeMaterial = (index) => {
    const updated = materials.filter((_, i) => i !== index);
    setMaterials(updated);
  };

  const updateMaterial = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  return (
    <div className="materials-list">
      {materials.map((m, index) => (
        <div key={index} className="material-row">
          <input
            placeholder="Material ID"
            value={m.materialId}
            onChange={(e) => updateMaterial(index, 'materialId', e.target.value)}
          />
          <input
            type="number"
            value={m.quantity}
            onChange={(e) => updateMaterial(index, 'quantity', e.target.value)}
          />
          <button onClick={() => removeMaterial(index)}>Delete</button>
        </div>
      ))}
      <button onClick={addMaterial}>Add Material</button>
    </div>
  );
}
