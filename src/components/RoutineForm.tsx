import { IonButton, IonInput, IonItem, IonList } from '@ionic/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { RoutineFormData, Task } from '../types'
import { useHistory } from 'react-router'

export type RoutineFormProps = {
  initialData?: RoutineFormData
  onSubmit: (data: RoutineFormData) => void
}

const RoutineForm: React.FC<RoutineFormProps> = ({ initialData, onSubmit }) => {
  const history = useHistory();
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

  const updateField = (field: keyof RoutineFormData, value: string | Task[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTask = () => {
    if (newTask.name.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { id: uuidv4(), ...newTask }],
    }))
    setNewTask({ name: '', description: '', time: undefined, reps: undefined, sets: 1})
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
        onIonChange={(e) => updateField('name', e.detail.value!)}
      />

      <IonList>
        {formData.tasks.map((task, index) => (
          <IonItem key={task.id}>
            <div>
              {index + 1}. {task.name} {task.time ? `(${task.time}s)` : ''}{' '}
              {task.reps ? `(${task.reps} reps)` : ''}
              {task.description && <small style={{ display: "block", color: "gray" }}>{task.description}</small>}
            </div>
          </IonItem>
        ))}
      </IonList>

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

      <IonButton  className='save-btn' onClick={handleSubmit}>
        Save Routine
      </IonButton>
    </>
  )
}

export default RoutineForm
