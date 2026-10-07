import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.ts'

const requestActivities = (signal) =>
  fetch(apiUrl('/api/activities/'), { signal })

const columns = [
  { label: 'Activity', value: (item) => item.activityType ?? item.name },
  { label: 'Athlete', value: (item) => item.user },
  { label: 'Team', value: (item) => item.team },
  { label: 'Duration', value: (item) => item.durationMinutes ? `${item.durationMinutes} min` : '' },
  { label: 'Points', value: (item) => item.points },
  { label: 'Completed', value: (item) => item.completedAt ? new Date(item.completedAt).toLocaleDateString() : '' },
]

export default function Activities() {
  return (
    <CollectionPage
      eyebrow="SHOW UP, MOVE FORWARD"
      title="Activities"
      description="A record of the effort you and your community put in."
      request={requestActivities}
      columns={columns}
    />
  )
}
