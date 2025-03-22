import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { v4 as uuidv4 } from 'uuid'
import RoutineForm from '../components/RoutineForm'
import { useRoutineStore } from '../store/useRoutines'
import type { RoutineFormData } from '../types'

const AddRoutine: React.FC = () => {
  const addRoutine = useRoutineStore((state) => state.addRoutine)

  const handleSave = (data: RoutineFormData) => {
    addRoutine({ id: uuidv4(), ...data })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <RoutineForm onSubmit={handleSave} />
      </IonContent>
    </IonPage>
  )
}

export default AddRoutine
