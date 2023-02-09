// style
import "./App.css";

// components
import GameZone from "./components/GameZone";
import Header from "./components/Header";

function App() {
  return (
    <div className="App container">
      <Header />
      <GameZone />
    </div>
  );
}

export default App;
