import ResourceCollection from './ResourceCollection.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration', render: (value) => value == null ? '-' : `${value} min` },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Details' },
];

export default function Workouts() {
  return <ResourceCollection title="Workouts" description="A library of sessions to keep the momentum going." resource="workouts" endpoint={endpoint} columns={columns} />;
}
