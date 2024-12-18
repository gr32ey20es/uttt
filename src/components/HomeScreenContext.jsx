import { useState, createContext, useContext } from "react";

const HomeScreenContext = createContext();
const useHomeScreenContext = () => useContext(HomeScreenContext);

const HomeScreenProvider = ({children}) => {
    const [overlay, setOverlay] = useState(true);
    const [gameDone, setGameDone] = useState(false);

    return <HomeScreenContext.Provider 
    value = {{ overlay, setOverlay, gameDone, setGameDone }}
    > {children} </HomeScreenContext.Provider>;
};

export default useHomeScreenContext;
export { HomeScreenProvider };