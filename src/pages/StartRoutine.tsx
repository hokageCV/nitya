import { IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { useParams } from 'react-router-dom'
import OngoingTask from '../components/OngoingTask'
import RoutineCompletedView from '../components/RoutineCompletedView'
import { useRoutineStore } from '../store/useRoutines'
import useRoutineState from '../utils/useRoutineState'

interface RouteParams {
  id: string
}

const StartRoutine: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const routine = useRoutineStore((state) => state.routines.find((r) => r.id === id))

  if (!routine) return <IonText>Routine not found.</IonText>

  const { currentTask, timeLeft, routineCompleted, moveToNextTask } = useRoutineState(routine)

  if (routineCompleted) return <RoutineCompletedView routineName={routine.name} />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{routine.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {currentTask && (
        <OngoingTask task={currentTask} timeLeft={timeLeft} moveToNextTask={moveToNextTask} />
      )}
    </IonPage>
  )
}

export default StartRoutine
