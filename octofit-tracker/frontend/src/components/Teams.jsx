import ResourceCollection from './ResourceCollection.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'members', label: 'Members', render: (value) => Array.isArray(value) ? value.length : '-' },
];

export default function Teams() {
  return <ResourceCollection title="Teams" description="The groups building consistency together." resource="teams" endpoint={endpoint} columns={columns} />;
}
