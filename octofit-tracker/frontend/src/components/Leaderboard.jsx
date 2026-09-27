import ResourceCollection from './ResourceCollection.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const columns = [
  { key: 'userId', label: 'Member' },
  { key: 'teamId', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
];

export default function Leaderboard() {
  return <ResourceCollection title="Leaderboard" description="See how members and teams are progressing." resource="leaderboard" endpoint={endpoint} columns={columns} />;
}
