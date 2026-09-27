import ResourceCollection from './ResourceCollection.jsx';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'members', label: 'Members', render: (value) => Array.isArray(value) ? value.length : '-' },
];

export default function Teams() {
  return <ResourceCollection title="Teams" description="The groups building consistency together." resource="teams" columns={columns} />;
}
