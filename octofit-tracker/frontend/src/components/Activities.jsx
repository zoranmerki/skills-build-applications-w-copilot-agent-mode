import ResourceCollection from './ResourceCollection.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'userId', label: 'Member' },
  { key: 'durationMinutes', label: 'Duration', render: (value) => value == null ? '-' : `${value} min` },
  { key: 'points', label: 'Points' },
  { key: 'performedAt', label: 'Date', render: (value) => value ? new Date(value).toLocaleDateString() : '-' },
];

export default function Activities() {
  return <ResourceCollection title="Activities" description="Recent training logged across your community." resource="activities" endpoint={endpoint} columns={columns} />;
}
