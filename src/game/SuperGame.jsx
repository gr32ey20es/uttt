import useStateContext from "./StateContext";
import SubGame from "./SubGame";

const SuperGame = () => {
    const { superGame, incSuperGame } = useStateContext();

    return <>
        <div className="SuperGame">
            <SubGame gameID={0}/>
            {/* <SubGame gameID={1}/> */}
        </div>
    </>       
}

export default SuperGame;