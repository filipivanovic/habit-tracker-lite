import { useState } from 'react';

const defaultHabits = [
  {
    id: '1',
    name: 'Drink Water',
    progress: [false, false, false, false, false, false, false]
  },
  {
    id: '2',
    name: 'Read 10 Pages',
    progress: [false, false, false, false, false, false, false]
  },
  {
    id: '3',
    name: 'Stretch',
    progress: [false, false, false, false, false, false, false]
  }
]

const App = () => {
  const [habits, setHabits] = useState(defaultHabits)
  const noHabits = habits.length === 0

  const handleAddHabit = (habit) => {
    setHabits([...habits, habit])
  }

  const handleToggleDay = (habitId, dayIndex) => {
    const habit = habits.find(h => h.id === habitId)
    const newProgress = [...habit.progress]
    newProgress[dayIndex] = !newProgress[dayIndex]
    const newHabit = {
      ...habit,
      progress: newProgress
    }
    setHabits(habits.map(h => h.id === habitId ? newHabit : h))
  }

  const resetAll = () => {
    if (habits.length === 0) return
    if (window.confirm('Are you sure you want to remove all habits?')) {
      setHabits([])
    }
  }

  return (
    <div className="app">
      <h1>Habit tracker</h1>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList habits={habits} onToggleDay={handleToggleDay} />
      <Button onClick={resetAll} disabled={noHabits}>Reset All</Button>
    </div>
  )
}

const HabitForm = ({onAddHabit}) => {
  const [habit, setHabit] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = habit.trim()
    if (!trimmed) return

    const newHabit = {
      id: window.crypto.randomUUID(),
      name: trimmed,
      progress: Array(7).fill(false)
    }
    if (newHabit.name.length === 0) return
    onAddHabit(newHabit)
    setHabit('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add habit</label>
      <input type="text" value={habit} onChange={(e) => setHabit(e.target.value)} />
      <Button onClick={handleSubmit} disabled={!habit.trim()}>
        Add
      </Button>
    </form>
  )
}

const HabitList = ({habits, onToggleDay}) => {
  return (
    <div className="habit-list">
      { habits.map(habit => <HabitItem key={habit.id} habit={habit} onToggleDay={onToggleDay} />)}
    </div>
  )
}

const HabitItem = ({ habit, onToggleDay }) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div className="habit-card">
      <div className="habit-name">{habit.name}</div>
      <div className="day-grid">
        {habit.progress.map((completed, dayIndex) => (
          <div className="day-cell" key={dayIndex}>
            <div className="day-label">{dayNames[dayIndex]}</div>
            <div
              className={`day-box ${completed ? 'completed' : ''}`}
              onClick={() => onToggleDay(habit.id, dayIndex)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const Button = ({ children, ...props }) => {
  return (
    <div className="button-panel">
      <button {...props}>{children}</button>
    </div>
  )
}

export default App