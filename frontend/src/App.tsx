import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./components/LandingPage";
import { Toaster } from "sonner";


function App() {

  return (
    <div className="bg-black text-white box-border">
      <Toaster/>
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App
