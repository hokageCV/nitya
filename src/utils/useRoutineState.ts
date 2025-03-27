import { useCallback, useEffect, useState } from 'react'
import type { Routine } from '../types'

const useRoutineState = (routine?: Routine | null) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [routineCompleted, setRoutineCompleted] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)

  const currentTask = routine?.tasks[currentTaskIndex]

  // Initialize task state
  useEffect(() => {
    if (!currentTask) return
    if (currentTask.time) {
      setTimeLeft(currentTask.time)
      setIsRunning(true)
    } else {
      setTimeLeft(null)
      setIsRunning(false)
    }
  }, [currentTask])

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft === null || timeLeft <= 0) return

    const timer = setTimeout(() => setTimeLeft((prev) => (prev ? prev - 1 : 0)), 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, isRunning])

  const moveToNextTask = useCallback(() => {
    if (!routine) return

    if (currentTask && currentSet < (currentTask.sets || 1)) {
      // 🚧 If there are more sets, repeat the same task
      setCurrentSet((prev) => prev + 1)
      setTimeLeft(currentTask.time || null)
      setIsRunning(true)
    } else if (currentTaskIndex < routine.tasks.length - 1) {
      // 🚧 Otherwise, move to the next task
      setCurrentTaskIndex((prev) => prev + 1)
      setCurrentSet(1) // Reset set count
    } else {
      setRoutineCompleted(true)
    }
  }, [routine, currentTask, currentSet, currentTaskIndex])

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      setIsRunning(false)
      moveToNextTask()
    }
  }, [timeLeft, isRunning, moveToNextTask])

  return { currentTask, currentSet, timeLeft, routineCompleted, moveToNextTask }
}

export default useRoutineState;
