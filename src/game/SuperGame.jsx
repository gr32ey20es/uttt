import './SuperGame.css';
import useStateContext from './StateContext';
import SubGame from "./MiniGame";
import NeonButton from '../components/NeonButton';
import { useEffect } from 'react';

const SuperGame = () => {
    const { mutex, state, setHasUndone } = useStateContext();
    useEffect(()=>{}, [state, mutex]); 

    return state === null ? <></> :
    <div className="SuperGame">
        <div className="CellSuperGameCol">
            <div className='TopBar'>
                <div>
                    <div className='PlayerTurn' style={{borderColor: state.playerTurn === 'X' ? '#2196f3' : state.playerTurn === 'O' ? '#e91e63' : '#eee' }}>
                        <div>Player Turn:</div>
                        <div>{state.playerTurn}</div>
                    </div>
                    <NeonButton color={state.playerTurn === 'X' ? '#e91e63' : '#2196f3'} 
                        onClick={!mutex ? () => setHasUndone(true) : () => {}}  disabled={!(state.hasUndone !== null)} text="Undo"/>
                </div>
            </div>

            <div className="CellSuperGameRow">
                <SubGame gameID={0}/>
                <div className='CellSuperGameCenter'><SubGame gameID={1}/></div>
                <SubGame gameID={2}/>
            </div>
            <div className="CellSuperGameRow middle">
                <SubGame gameID={3}/>
                <div className='CellSuperGameCenter'><SubGame gameID={4}/></div>
                <SubGame gameID={5}/>
            </div>
            <div className="CellSuperGameRow">
                <SubGame gameID={6}/>
                <div className='CellSuperGameCenter'><SubGame gameID={7}/></div>
                <SubGame gameID={8}/>
            </div>
        </div>
    </div>;
}

export default SuperGame;