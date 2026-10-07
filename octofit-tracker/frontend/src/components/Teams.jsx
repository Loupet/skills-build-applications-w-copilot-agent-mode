import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.ts'

const requestTeams = (signal) =>
  fetch(apiUrl('/api/teams/'), { signal })

const columns = [
  { label: 'Team', value: (item) => item.name },
  { label: 'Members', value: (item) => item.members },
  { label: 'Points', value: (item) => item.points },
]

export default function Teams() {
  return (
    <CollectionPage
      eyebrow="STRONGER SIDE BY SIDE"
      title="Teams"
      description="Find your crew and make every milestone a shared one."
      request={requestTeams}
      columns={columns}
    />
  )
}
