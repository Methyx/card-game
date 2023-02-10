import { useState } from "react";

// style
import "./App.css";

// components
import GameZone from "./components/GameZone";
import Header from "./components/Header";

import { GameContext } from "./functions/context";

function App() {
  // const [initDeck, initColumns] = initGame();
  const [deck, setDeck] = useState([]);
  const [columns, setColumns] = useState([]);
  const [stacks, setStacks] = useState([[], [], [], []]);
  const [rejected, setRejected] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div className="App container">
      <GameContext.Provider
        value={{
          deck: deck,
          setDeck: setDeck,
          columns: columns,
          setColumns: setColumns,
          stacks: stacks,
          setStacks: setStacks,
          rejected: rejected,
          setRejected: setRejected,
          gameWon: gameWon,
          setGameWon: setGameWon,
        }}
      >
        <Header />
        <GameZone />
      </GameContext.Provider>
    </div>
  );
}

export default App;
