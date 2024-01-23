import { Toaster } from "react-hot-toast";
import "./App.css";
import DynamicForm from "./components/dynamic-form";

function App() {
  return (
    <main className={`flex w-full  min-h-screen flex-col px-4 md:px-40 `}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex w-full lg:[w-70%] max-w-[700px] max-h-[700px] overflow-hidden items-center justify-center mt-10">
          <DynamicForm />
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
