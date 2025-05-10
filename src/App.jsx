import Assembly from "./components/Assembly/Assembly";
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Tenzies from "./components/Tenzies/Tenzies";

function App() {
  return(
    <>
    <div className="game-block">
    <Assembly/>
    </div>
    <div className="game-block">
    <MemeGenerator/>
    </div>
    <div className="game-block">
      <Tenzies/>
    </div>
    </>
  )
}

export default App
