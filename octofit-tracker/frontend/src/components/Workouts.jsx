import ResourceCollection from './ResourceCollection.jsx';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration', render: (value) => value == null ? '-' : `${value} min` },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'description', label: 'Details' },
];

export default function Workouts() {
  return <ResourceCollection title="Workouts" description="A library of sessions to keep the momentum going." resource="workouts" columns={columns} />;
}
