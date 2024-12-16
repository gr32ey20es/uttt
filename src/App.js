import { StateProvider } from "./game/StateContext";
import SuperGame from "./game/SuperGame";

function App() {
  return (
    <StateProvider>
      <SuperGame/>
    </StateProvider>
  );
}

export default App;
