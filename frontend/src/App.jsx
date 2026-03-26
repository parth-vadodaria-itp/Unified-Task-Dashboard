import './App.css'
import Tasks from './components/Tasks'
import Events from './components/Events'

function App() {
    return (
        <>
            <main className="h-full overflow-y-auto p-4 bg-primary grid gap-4">
                <Tasks />
                <Events />
            </main>
        </>
    )
}

export default App
