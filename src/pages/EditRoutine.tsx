import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useParams } from 'react-router-dom'
import { useRoutineStore } from '../store/useRoutines'
import type { RoutineFormData } from '../types'
import RoutineForm  from '../components/RoutineForm'

const EditRoutine: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const routines = useRoutineStore((state) => state.routines)
  const updateRoutine = useRoutineStore((state) => state.updateRoutine)

  const routine = routines.find((r) => r.id === id)

  if (!routine) return <p>Routine not found</p>

  const handleUpdate = (data: RoutineFormData) => {
    updateRoutine({ id: id, ...data })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <RoutineForm initialData={routine} onSubmit={handleUpdate} />
      </IonContent>
    </IonPage>
  )
}

export default EditRoutine
