import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL } from './api.js';
import octofitLogo from '../../../docs/octofitapp-small.png';

const navigation = [
  { path: '/activities', label: 'Activities', number: '01' },
  { path: '/leaderboard', label: 'Leaderboard', number: '02' },
  { path: '/teams', label: 'Teams', number: '03' },
  { path: '/users', label: 'Members', number: '04' },
  { path: '/workouts', label: 'Workouts', number: '05' },
];

function AppFrame() {
  return (
    <div className="tracker-shell">
      <aside className="sidebar">
        <Link className="brand" to="/users" aria-label="Octofit home">
          <img className="brand-logo" src={octofitLogo} alt="" />
          <span className="brand-name">octofit<span>.</span></span>
        </Link>
        <p className="sidebar-caption">TEAM PERFORMANCE</p>
        <nav className="side-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}
            >
              <span className="side-number">{item.number}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>API endpoint</span>
          <span className="api-host">{new URL(API_BASE_URL).host}</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">OCTOFIT TRACKER</span>
            <p className="topbar-title">Move together. Go further.</p>
          </div>
          <span className="topbar-tag">ACTIVITY / COMMUNITY / PROGRESS</span>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<section className="not-found"><h1>Page not found</h1><Link to="/users">Back to members</Link></section>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}
