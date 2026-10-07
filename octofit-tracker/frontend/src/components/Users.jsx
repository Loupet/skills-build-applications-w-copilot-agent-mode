import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.ts'

const requestUsers = (signal) =>
  fetch(apiUrl('/api/users/'), { signal })

const columns = [
  { label: 'Athlete', value: (item) => item.name },
  { label: 'Email', value: (item) => item.email },
  { label: 'Team', value: (item) => item.team },
]

export default function Users() {
  return (
    <CollectionPage
      eyebrow="MEET THE COMMUNITY"
      title="Athletes"
      description="The people making this community move."
      request={requestUsers}
      columns={columns}
    />
  )
}
