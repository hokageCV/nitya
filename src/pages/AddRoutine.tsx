import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRoutineStore } from '../store/useRoutines'

const AddRoutine: React.FC = () => {
  const addRoutine = useRoutineStore((state) => state.addRoutine)
  const [routineName, setRoutineName] = useState('')
  const [tasks, setTasks] = useState<{ id: string; name: string; time?: number; reps?: number }[]>(
    []
  )
  const [taskName, setTaskName] = useState('')
  const [taskTime, setTaskTime] = useState<number | undefined>()
  const [taskReps, setTaskReps] = useState<number | undefined>()

  const addTask = () => {
    if (taskName.trim() === '') return
    setTasks([...tasks, { id: uuidv4(), name: taskName, time: taskTime, reps: taskReps }])
    setTaskName('')
    setTaskTime(undefined)
    setTaskReps(undefined)
  }

  const saveRoutine = () => {
    if (routineName.trim() === '') return

    let updatedTasks = [...tasks]

    if (taskName.trim() !== '') {
      updatedTasks.push({ id: uuidv4(), name: taskName, time: taskTime, reps: taskReps })
    }

    if (updatedTasks.length === 0) return

    addRoutine({ id: uuidv4(), name: routineName, tasks: updatedTasks })

    setRoutineName('')
    setTasks([])
    setTaskName('')
    setTaskTime(undefined)
    setTaskReps(undefined)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput
          placeholder='Routine Name'
          value={routineName}
          onIonChange={(e) => setRoutineName(e.detail.value!)}
        />

        <IonList>
          {tasks.map((task, index) => (
            <IonItem key={task.id}>
              {index + 1}. {task.name} {task.time ? `(${task.time}s)` : ''}{' '}
              {task.reps ? `(${task.reps} reps)` : ''}
            </IonItem>
          ))}
        </IonList>

        <IonInput
          placeholder='Task Name'
          value={taskName}
          onIonChange={(e) => setTaskName(e.detail.value!)}
        />
        <IonInput
          type='number'
          placeholder='Time (seconds)'
          value={taskTime}
          onIonChange={(e) => setTaskTime(Number(e.detail.value))}
        />
        <IonInput
          type='number'
          placeholder='Reps'
          value={taskReps}
          onIonChange={(e) => setTaskReps(Number(e.detail.value))}
        />

        <IonButton expand='full' onClick={addTask}>
          Add Task
        </IonButton>
        <IonButton expand='full' color='success' onClick={saveRoutine}>
          Save Routine
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default AddRoutine
