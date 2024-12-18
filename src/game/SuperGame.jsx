import './SuperGame.css';
import useStateContext from './StateContext';
import SubGame from "./MiniGame";
import NeonButton from '../components/NeonButton';
import { useEffect } from 'react';

const SuperGame = () => {
    const { mutex, setMutex, state, setHasUndone } = useStateContext();

    useEffect(()=>{}, [state, mutex]); 

    const getCellSuperGame = (gameID) => {
        let className = 
        (state.superGame[gameID] === null ? '' :
            (state.superGame[gameID] === 'X' ? 'XWin' : 
                state.superGame[gameID] === 'O' ? 'OWin' : 'Draw'))

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
                <div className='CellSuperGameCenter'>{getCellSuperGame(1)}</div>
                {getCellSuperGame(2)}
            </div>
            <div className="CellSuperGameRow middle">
                {getCellSuperGame(3)}
                <div className='CellSuperGameCenter'>{getCellSuperGame(4)}</div>
                {getCellSuperGame(5)}
            </div>
            <div className="CellSuperGameRow">
                {getCellSuperGame(6)}
                <div className='CellSuperGameCenter'>{getCellSuperGame(7)}</div>
                {getCellSuperGame(8)}
            </div>

            <div className='BottomBar'>
                <NeonButton color={state.playerTurn === 'X' ? '#e91e63' : '#2196f3'} 
                    onClick={!mutex ? () => setHasUndone(true) : () => {}}  disabled={!(state.hasUndone !== null)} text="Undo"/>
                <div className='PlayerTurn'>
                    <div>Player Turn:</div>
                    <div>{state.playerTurn}</div>
                </div>
            </div>
        </div>
    </div>
    </>       
}

export default SuperGame;