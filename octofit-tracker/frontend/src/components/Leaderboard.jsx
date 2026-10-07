import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.ts'

const requestLeaderboard = (signal) =>
  fetch(apiUrl('/api/leaderboard/'), { signal })

const columns = [
  { label: 'Rank', value: (item) => item.rank },
  { label: 'Athlete', value: (item) => item.user },
  { label: 'Team', value: (item) => item.team },
  { label: 'Points', value: (item) => item.points },
  { label: 'Period', value: (item) => item.period },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      eyebrow="CELEBRATE EVERY WIN"
      title="Leaderboard"
      description="Friendly competition, measured in progress—not perfection."
      request={requestLeaderboard}
      columns={columns}
    />
  )
}
