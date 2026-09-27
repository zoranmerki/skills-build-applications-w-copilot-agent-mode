import ResourceCollection from './ResourceCollection.jsx';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
];

export default function Users() {
  return <ResourceCollection title="Members" description="Member profiles and current point totals." resource="users" columns={columns} />;
}
