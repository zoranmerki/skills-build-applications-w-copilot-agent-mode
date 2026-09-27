import ResourceCollection from './ResourceCollection.jsx';

const columns = [
  { key: 'userId', label: 'Member' },
  { key: 'teamId', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
];

export default function Leaderboard() {
  return <ResourceCollection title="Leaderboard" description="See how members and teams are progressing." resource="leaderboard" columns={columns} />;
}
