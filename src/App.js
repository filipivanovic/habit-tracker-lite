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

  const handleAddHabit = (habit) => {
    setHabits([...habits, habit])
  }

  const resetAll = () => {
    setHabits([])
  }

  return (
    <div className="app">
      <h1>Habit tracker</h1>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList habits={habits} />
      <Button onClick={resetAll}>Reset All</Button>
    </div>
  )
}

const HabitForm = ({onAddHabit}) => {
  const [habit, setHabit] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newHabit = {
      id: window.crypto.randomUUID(),
      name: habit,
      progress: [false, false, false, false, false, false, false]
    }
    if (newHabit.name.length === 0) return
    onAddHabit(newHabit)
    console.log(newHabit)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Add habit</label>
      <input type="text" value={habit} onChange={(e) => setHabit(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

const HabitList = ({habits}) => {
  return (
    <div className="habit-list">
      { habits.map(habit => <HabitItem key={habit.id} habit={habit} />)}
    </div>
  )
}

const HabitItem = ({ habit, onToggleDay }) => {
  return (
    <div className="habit-card">
      <div className="habit-name">{habit.name}</div>
      <div className="day-grid">
        {habit.progress.map((completed, dayIndex) => (
          <div
            key={dayIndex}
            className={`day-box ${completed ? 'completed' : ''}`}
            onClick={() => onToggleDay(habit.id, dayIndex)}
            title={`Day ${dayIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const Button = ({children, onClick}) => {
  return (
    <div className="button-panel">
      <button onClick={onClick}>{children}</button>
    </div>
  )
}

export default App