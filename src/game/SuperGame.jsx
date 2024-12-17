import './SuperGame.css';
import SubGame from "./SubGame";
import useStateContext from './StateContext';

const SuperGame = () => {
    const { isUndo, setIsUndo } = useStateContext();

    return <>
    <div className="SuperGame">
        <div className="CellSuperGameCol">
            <div className="CellSuperGameRow">
                <div className="CellSuperGame"><SubGame gameID={0}/></div>
                <div className="CellSuperGame center"><SubGame gameID={1}/></div>
                <div className="CellSuperGame"><SubGame gameID={2}/></div>
            </div>
            <div className="CellSuperGameRow middle">
                <div className="CellSuperGame"><SubGame gameID={3}/></div>
                <div className="CellSuperGame center"><SubGame gameID={4}/></div>
                <div className="CellSuperGame"><SubGame gameID={5}/></div>
            </div>
            <div className="CellSuperGameRow">
                <div className="CellSuperGame"><SubGame gameID={6}/></div>
                <div className="CellSuperGame center"><SubGame gameID={7}/></div>
                <div className="CellSuperGame"><SubGame gameID={8}/></div>
            </div>

            <div>
                <button onClick={() => setIsUndo(true)} disabled={!(isUndo !== null)}>Undo</button>
            </div>
        </div>
    </div>
    </>       
}

export default SuperGame;