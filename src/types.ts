export type Task = {
  id: string;
  name: string;
  time?: number;
  reps?: number;
}

export type Routine = {
  id: string;
  name: string;
  tasks: Task[];
}

export type RoutineFormData = {
  name: string
  tasks: Task[]
}
