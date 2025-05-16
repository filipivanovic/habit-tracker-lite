const App = () => {
  return (
    <div className="app">
      <h1>Habit tracker</h1>
      <HabitForm />
      <HabitList />
      <Button />
    </div>
  )
}

const HabitForm = () => {
  return (
    <div>
      <h1>Habit form</h1>
    </div>
  )
}

const HabitList = () => {
  return (
    <div>
      <h1>Habit list</h1>
      <HabitItem />
    </div>
  )
}

const HabitItem = () => {
  return (
    <div>
      <h1>Habit item</h1>
    </div>
  )
}

const Button = () => {
  return (
    <div>
      <h1>Button</h1>
    </div>
  )
}

export default App