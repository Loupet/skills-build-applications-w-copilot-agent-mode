import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.ts'

const requestWorkouts = (signal) =>
  fetch(apiUrl('/api/workouts/'), { signal })

const columns = [
  { label: 'Workout', value: (item) => item.name },
  { label: 'Description', value: (item) => item.description },
  { label: 'Difficulty', value: (item) => item.difficulty },
  { label: 'Duration', value: (item) => item.durationMinutes ? `${item.durationMinutes} min` : '' },
  { label: 'Exercises', value: (item) => item.exercises?.map((exercise) => exercise.name ?? exercise) },
]

export default function Workouts() {
  return (
    <CollectionPage
      eyebrow="FIND YOUR NEXT CHALLENGE"
      title="Workouts"
      description="Thoughtful sessions to help you find your rhythm."
      request={requestWorkouts}
      columns={columns}
    />
  )
}
