import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { caretForwardCircleOutline, createOutline, trashOutline } from 'ionicons/icons'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRoutineStore } from '../store/useRoutines'

const RoutineList: React.FC = () => {
  const { routines, loadRoutines, deleteRoutine } = useRoutineStore()
  const history = useHistory()

  useEffect(() => {
    loadRoutines()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar'>
          <IonTitle>Routines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow className='ion-justify-content-end'>
            <IonCol size='auto'>
              <IonButton className='add-btn' routerLink='/add-routine' >
                Add New Routine
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {routines.length === 0 ? (
          <p>No routines found. Create one!</p>
        ) : (
          <IonList className='routine-list'>
            {routines.map((routine) => (
              <IonItem className='ion-item' key={routine.id}>
                <IonLabel>{routine.name}</IonLabel>
                <IonButton
                  className='list-action-btn'
                  onClick={() => history.push(`/start-routine/${routine.id}`)}
                >
                  <IonIcon color='primary' icon={caretForwardCircleOutline}></IonIcon>
                </IonButton>
                <IonButton
                  className='list-action-btn'
                  onClick={() => history.push(`/edit-routine/${routine.id}`)}
                >
                  <IonIcon color='tertiary' icon={createOutline}></IonIcon>
                </IonButton>
                <IonButton className='list-action-btn' onClick={() => deleteRoutine(routine.id)}>
                  <IonIcon color='danger' icon={trashOutline}></IonIcon>
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default RoutineList
