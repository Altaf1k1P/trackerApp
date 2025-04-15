import {useState} from "react";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddTransactionDialog from "./components/formPopup/AddTransactionDialog";


const App = () => {
    const [open, setOpen] = useState(false)
  

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <Navbar onCreateClick={() => setOpen(true)}/>
     <Dashboard/>
     <AddTransactionDialog open={open} setOpen={setOpen} />
    </div>
    
  );
};

export default App;
