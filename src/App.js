import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header } from "./frontend/Components/Header/Header";
import { PageRoutes } from "./frontend/Routes/PageRoutes";

function App() {
  return (
    <div className="App">
      <Header/>
      <PageRoutes/>
      <Toaster  toastOptions={{
    style: {
      color: 'white',
      backgroundColor: "#343a40",
      fontSize: "2.5rem"
    },
  }}/>
    </div>
  );
}

export default App;
