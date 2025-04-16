import { useState } from "react";
import { useDispatch } from "react-redux"; 
import { addTransaction } from "./store/transactionSlice.js"; 
import Navbar from "./components/Navbar";
import AddTransactionDialog from "./components/formPopup/AddTransactionDialog";
import { Outlet } from "react-router";

const App = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const dispatch = useDispatch(); 

  const handleCreateClick = () => {
    setInitialData(null);
    setOpen(true);
  };

  const handleSubmit = (data) => {
    console.log("Submitted transaction:", data);
    dispatch(addTransaction(data));
    setInitialData(null);
    setOpen(false); 
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <Navbar onCreateClick={handleCreateClick} />
      <main>
        <Outlet context={{ setOpen, setInitialData }} />
      </main>
      <AddTransactionDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
