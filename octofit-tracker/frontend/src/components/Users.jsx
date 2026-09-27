import ResourceCollection from './ResourceCollection.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
];

export default function Users() {
  return <ResourceCollection title="Members" description="Member profiles and current point totals." resource="users" endpoint={endpoint} columns={columns} />;
}
