import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AIAgentComponent from './components/AIAgentComponent'
import DecisionPageContainer from './pages/DecisionPageContainer'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-black">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/agent" element={<AIAgentComponent />} />
                    <Route path="/decision" element={<DecisionPageContainer />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
