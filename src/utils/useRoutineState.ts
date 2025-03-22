import { useCallback, useEffect, useState } from 'react'
import type { Routine } from '../types'

const useRoutineState = (routine?: Routine | null) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [routineCompleted, setRoutineCompleted] = useState(false)

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
    if (currentTaskIndex < routine.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1)
    } else {
      setRoutineCompleted(true)
    }
  }, [routine, currentTaskIndex])

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      setIsRunning(false)
      moveToNextTask()
    }
  }, [timeLeft, isRunning, moveToNextTask])

  return { currentTask, timeLeft, routineCompleted, moveToNextTask }
}

export default useRoutineState;
