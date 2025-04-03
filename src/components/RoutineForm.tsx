import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTextarea,
} from '@ionic/react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import type { RoutineFormData, Task } from '../types'

export type RoutineFormProps = {
  initialData?: RoutineFormData
  onSubmit: (data: RoutineFormData) => void
}

const RoutineForm: React.FC<RoutineFormProps> = ({ initialData, onSubmit }) => {
  const history = useHistory()
  const [formData, setFormData] = useState<RoutineFormData>({
    name: initialData?.name || '',
    tasks: initialData?.tasks || [],
  })

  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    name: '',
    description: '',
    time: undefined,
    reps: undefined,
    sets: 1,
  })

  const updateTask = (index: number, field: keyof Task, value: any) => {
    setFormData((prev) => {
      const updatedTasks = [...prev.tasks]
      updatedTasks[index] = { ...updatedTasks[index], [field]: value }
      return { ...prev, tasks: updatedTasks }
    })
  }

  const removeTask = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== id),
    }))
  }

  const addTask = () => {
    if (newTask.name.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: uuidv4(), ...newTask }],
    }))
    setNewTask({ name: '', description: '', time: undefined, reps: undefined, sets: 1 })
  }

  const handleSubmit = () => {
    if (formData.name.trim() === '' || formData.tasks.length === 0) return
    onSubmit(formData)
    history.push('/')
  }

  return (
    <>
      <IonInput
        placeholder='Routine Name'
        value={formData.name}
        onIonChange={(e) => setFormData((prev) => ({ ...prev, name: e.detail.value! }))}
      />

      <TaskList tasks={formData.tasks} updateTask={updateTask} removeTask={removeTask} />

      <IonInput
        placeholder='Task Name'
        value={newTask.name}
        onIonChange={(e) => setNewTask({ ...newTask, name: e.detail.value! })}
      />
      <IonInput
        placeholder='Description'
        value={newTask.description}
        onIonChange={(e) => setNewTask({ ...newTask, description: e.detail.value! })}
      />
      <IonInput
        type='number'
        placeholder='Time (seconds)'
        value={newTask.time}
        onIonChange={(e) => setNewTask({ ...newTask, time: Number(e.detail.value) })}
      />
      <IonInput
        type='number'
        placeholder='Reps'
        value={newTask.reps}
        onIonChange={(e) => setNewTask({ ...newTask, reps: Number(e.detail.value) })}
      />
      <IonInput
        type='number'
        placeholder='Sets'
        value={newTask.sets}
        onIonChange={(e) => setNewTask({ ...newTask, sets: Number(e.detail.value) })}
      />
      <IonButton className='add-btn' onClick={addTask}>
        Add Task
      </IonButton>

      <IonButton className='save-btn' onClick={handleSubmit}>
        Save Routine
      </IonButton>
    </>
  )
}

export default RoutineForm

type TaskListProps = {
  tasks: Task[]
  updateTask: (index: number, field: keyof Task, value: string | number) => void
  removeTask: (taskId: string) => void
}

const TaskList = ({ tasks, updateTask, removeTask }: TaskListProps) => (
  <IonList>
    {tasks.map((task, index) => (
      <IonItem key={task.id}>
        <IonGrid>
          <IonRow className='ion-align-items-center'>
            <IonCol size='9'>
              <IonItem lines='none'>
                <IonLabel position='stacked'>Task Name</IonLabel>
                <IonInput
                  value={task.name}
                  onIonChange={(e) => updateTask(index, 'name', e.detail.value!)}
                />
              </IonItem>

              <IonItem lines='none'>
                <IonLabel position='stacked'>Description</IonLabel>
                <IonTextarea
                  value={task.description}
                  autoGrow
                  onIonChange={(e) => updateTask(index, 'description', e.detail.value!)}
                />
              </IonItem>

              <IonRow>
                <IonCol>
                  <IonItem lines='none'>
                    <IonLabel position='stacked'>Time (sec)</IonLabel>
                    <IonInput
                      type='number'
                      value={task.time}
                      onIonChange={(e) => updateTask(index, 'time', Number(e.detail.value))}
                    />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem lines='none'>
                    <IonLabel position='stacked'>Reps</IonLabel>
                    <IonInput
                      type='number'
                      value={task.reps}
                      onIonChange={(e) => updateTask(index, 'reps', Number(e.detail.value))}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonCol>

            <IonCol size='3' className='ion-text-right'>
              <IonButton color='danger' onClick={() => removeTask(task.id)}>
                Delete
              </IonButton>

              <IonItem lines='none'>
                <IonLabel position='stacked'>Sets</IonLabel>
                <IonInput
                  type='number'
                  value={task.sets}
                  onIonChange={(e) => updateTask(index, 'sets', Number(e.detail.value))}
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    ))}
  </IonList>
)
