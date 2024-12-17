import './SuperGame.css';
import useStateContext from './StateContext';
import SubGame from "./SubGame";
import NeonButton from '../components/NeonButton';

const SuperGame = () => {
    const { playerTurn, superGame, setSuperGame, isUndo, setIsUndo } = useStateContext();

    const getCellSuperGame = (gameID) => {
        let className = 
        (superGame[gameID] === null ? '' :
            (superGame[gameID] === 'X' ? 'XWin' : 
                superGame[gameID] === 'O' ? 'OWin' : 'Draw'))

        return <>
            <div className={"CellSuperGame " + className}>
                <SubGame gameID={gameID}/>
            </div>
        </>
    }

    return <>
    <div className="SuperGame">
        <div className="CellSuperGameCol">
            <div className="CellSuperGameRow">
                {getCellSuperGame(0)}
                <div className='CellSuperGameCenter'>
                    <div className="CellSuperGame"><SubGame gameID={1}/></div>
                </div>
                <div className="CellSuperGame"><SubGame gameID={2}/></div>
            </div>
            <div className="CellSuperGameRow middle">
                <div className="CellSuperGame"><SubGame gameID={3}/></div>
                <div className='CellSuperGameCenter'>
                    <div className="CellSuperGame"><SubGame gameID={4}/></div>
                </div>
                <div className="CellSuperGame"><SubGame gameID={5}/></div>
            </div>
            <div className="CellSuperGameRow">
                <div className="CellSuperGame"><SubGame gameID={6}/></div>
                <div className='CellSuperGameCenter'>
                    <div className="CellSuperGame"><SubGame gameID={7}/></div>
                </div>
                <div className="CellSuperGame"><SubGame gameID={8}/></div>
            </div>

            <div className='BottomBar'>
                <NeonButton color={playerTurn === 'X' ? '#e91e63' : '#2196f3'} 
                    onClick={() => setIsUndo(true)} disabled={!(isUndo !== null)} text="Undo"/>
                <button className='PlayerTurn' onClick={()=>{
                    let newSuperGame = [...superGame];
                    newSuperGame[0] = newSuperGame[0] === 'X' ? 'O' : 'X';
                    setSuperGame(newSuperGame);
                }}>
                    <div>Player Turn:</div>
                    <div>{playerTurn}</div>
                </button>
            </div>
        </div>
    </div>
    </>       
}

export default SuperGame;