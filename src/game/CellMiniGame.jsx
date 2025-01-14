import './CellMiniGame.css';
import useStateContext from "./StateContext";
import { useEffect, useRef, useState } from 'react';

const CellMiniGame = ({ gameID, index }) => {
    const { 
        state, setMutex, isClickable, isAlternateCellMG, 
        moveUpdate, undoUpdate, AIMove, isAIMove, setIsAIMove
    } = useStateContext();

    const [ isAIClick, setIsAIClick ] = useState(false);

    const [ selfAni, setSelfAni ] = useState({
        type: null,
        event: null,
        onAnimationEnd: () => setMutex(false)
    });

    const buttonRef = useRef(null);
    let clickable = isClickable(gameID, index);
    let alternate = isAlternateCellMG(gameID, index);

    useEffect(() => {
        if(alternate) {
            setMutex(true);
            setSelfAni({ ...selfAni, event: 'PathHidden' });
            undoUpdate();
        }; 
    }, [state]);

    useEffect(() => {
        if(AIMove !== null && Math.floor(AIMove / 9) === gameID && AIMove % 9 === index)
            {
                setIsAIClick(true);
                setTimeout(() => {
                    try {buttonRef.current.click()}
                    catch {}
                }
                , 500);   // Change it!!!
                setTimeout(()=>{      
                    setIsAIClick(false);        
                    setIsAIMove(false);
                }, 600);   // Change it!!!
            }
    }, [AIMove, isAIClick])

    const onClickAI = () => {
        console.log(1);

        setMutex(true);
        setSelfAni({ ...selfAni, type: state.playerTurn, event: 'PathVisible' });
        moveUpdate(gameID, index);
    }

    const onClickHuman = async () => {
        console.log(2);

        setMutex(true);
        setSelfAni({ ...selfAni, type: state.playerTurn, event: 'PathVisible' });
        moveUpdate(gameID, index);
        setIsAIMove(isAIMove === null ? null : true);
    }

    return <>
    <div 
        className={'CellMiniGame' + (clickable ? ' hover' : '')}
        onClick={clickable ? (isAIClick ? onClickAI : onClickHuman) : null}
        ref={buttonRef}
        style={{
            '--hover-color': state.playerTurn === 'X' ? '#bbdefb' : '#f8bbd0',
            '--background-color': clickable ? (state.playerTurn === 'X' ? '#e3f2fd' : '#fce4ec') : '#fff'
        }}> 
        <div className='XONDrawer'>
            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'X' ? ('XPathDrawer ' + selfAni.event) : '')}  
                    style={{'--stroke-dasharray': '1'}} strokeLinecap='round' x1={0.2} y1={0.2} x2={0.8} y2={0.8}/>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'X' ? ('XPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'X' ? selfAni.onAnimationEnd : null} strokeDashoffset={selfAni.event === 'PathVisible' ? 1 : 0}
                    style={{animationDelay: '0.15s', '--stroke-dasharray': '1'}} strokeLinecap='round' x1={0.8} y1={0.2} x2={0.2} y2={0.8}/>
            </svg>
            
            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <ellipse 
                    className={'PathDrawer ' + (selfAni.type === 'O' ? ('OPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'O' ? selfAni.onAnimationEnd : null}
                    style={{animationDuration: '0.35s', '--stroke-dasharray': '2.42'}} transform='rotate(-90 0.5 0.5)' rx={0.4} ry={0.37} cx={0.5} cy={0.5}/>
            </svg>

            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'N' ? ('NPathDrawer ' + selfAni.event) : '')}  
                    style={{'--stroke-dasharray': '0.80'}} strokeLinecap='round' x1={0.1} y1={0.3} x2={0.9} y2={0.3}/>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'N' ? ('NPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'N' ? selfAni.onAnimationEnd : null} strokeDashoffset={selfAni.event === 'PathVisible' ? 0.8 : 0}
                    style={{animationDelay: '0.15s', '--stroke-dasharray': '0.80'}} strokeLinecap='round' x1={0.1} y1={0.7} x2={0.9} y2={0.7}/>
            </svg>
        </div>
    </div>
    </>
}

export default CellMiniGame;