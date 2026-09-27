import ResourceCollection from './ResourceCollection.jsx';

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'userId', label: 'Member' },
  { key: 'durationMinutes', label: 'Duration', render: (value) => value == null ? '-' : `${value} min` },
  { key: 'points', label: 'Points' },
  { key: 'performedAt', label: 'Date', render: (value) => value ? new Date(value).toLocaleDateString() : '-' },
];

export default function Activities() {
  return <ResourceCollection title="Activities" description="Recent training logged across your community." resource="activities" columns={columns} />;
}
