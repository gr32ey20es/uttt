import { StateProvider } from "./game/StateContext";
import { HomeScreenProvider } from "./components/HomeScreenContext";
import SuperGame from "./game/SuperGame";
import HomeScreen from "./components/HomeScreen";

function App() {
  	return <>
	<HomeScreenProvider>
		<StateProvider>
			<div className="BackgroundImg">
				<HomeScreen/>
				<SuperGame/>
			</div>
		</StateProvider>
    </HomeScreenProvider>
  	</>;
}

export default App;
