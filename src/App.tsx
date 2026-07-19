import './App.css'
import { SettingsForm } from './components/SettingsForm'

function App() {
  return (
    <>
      <section id="settings">
        <header className="settings-header">
          <h1>Settings</h1>
          <p>Update your profile and preferences.</p>
        </header>
        <SettingsForm />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
