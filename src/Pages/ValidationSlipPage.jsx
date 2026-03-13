import { useParams } from 'react-router-dom';
import { fetchValidationFake } from '../Api/fakeApi';
import * as QRCodeModule from 'qrcode.react';
const QRCode = QRCodeModule.QRCode;

export default function ValidationSlipPage() {
  const { id } = useParams();
  const data = fetchValidationFake(id);
  if (!data) return <p className="p-4">Validation info not available yet</p>;
  return (
    <div className="p-6 border rounded">
      {' '}
      <h2 className="text-xl font-bold mb-2">Bon de Validation</h2>{' '}
      <button className="mb-4 px-2 py-1 border" onClick={() => window.print()}>
        {' '}
        Print{' '}
      </button>{' '}
      <p>Requested by: {data.student}</p> <p>Project: {data.project}</p>{' '}
      <p>Created: {data.created}</p> <p>Validated: {data.validated}</p>{' '}
      <div className="mt-4">
        {' '}
        <h3 className="font-bold">Matériel Validé ({data.items.length} articles)</h3>{' '}
        <ul>
          {' '}
          {data.items.map((i, idx) => (
            <li key={idx}>
              {' '}
              {i.name} ({i.category}) x {i.quantity}{' '}
            </li>
          ))}{' '}
        </ul>{' '}
      </div>{' '}
      <div className="mt-4">
        {' '}
        <QRCode value={data.qrCode} />{' '}
      </div>{' '}
    </div>
  );
}
