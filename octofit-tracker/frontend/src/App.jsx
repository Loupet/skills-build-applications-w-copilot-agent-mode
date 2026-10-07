import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">YOUR MOVEMENT, YOUR MOMENT</p>
      <h1>Make every move count.</h1>
      <p className="overview-copy">
        Build healthy habits, find your people, and celebrate the progress you make
        together.
      </p>
      <div className="overview-grid">
        {[
          { title: 'Log your activity', detail: 'Every effort deserves a place.' },
          { title: 'Find your team', detail: 'Good energy is better shared.' },
          { title: 'See your progress', detail: 'Small steps add up to big wins.' },
        ].map((item, index) => (
          <article className="overview-card" key={item.title}>
            <span className="card-number">0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="Octofit home">
          <img className="brand-mark" src={octofitLogo} alt="" />
          <span>octofit<span className="brand-period">.</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <span className="topbar-note">A little stronger, every day.</span>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>OCTOFIT TRACKER</span>
        <span>Progress is better together.</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
