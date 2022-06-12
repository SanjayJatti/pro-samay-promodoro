import "./App.css";
import { Header } from "./frontend/Components/Header/Header";
import { PageRoutes } from "./frontend/Routes/PageRoutes";

function App() {
  return (
    <div className="App">
      <Header/>
      <PageRoutes/>
    </div>
  );
}

export default App;
