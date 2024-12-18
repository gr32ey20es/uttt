import './CellMiniGame.css';
import useStateContext from "./StateContext";
import { useEffect, useState } from 'react';

const CellMiniGame = ({ gameID, index }) => {
    const { state, setMutex, isClickable, isAlternate, moveUpdate, undoUpdate} = useStateContext();
    const [ selfAni, setSelfAni ] = useState({
        type: null,
        event: null,
        onAnimationEnd: () => setMutex(false)
    });

    let clickable = isClickable(gameID, index);
    let alternate = isAlternate(gameID, index);

    useEffect(() => {
        if(alternate) {
            setMutex(true);
            setSelfAni({ ...selfAni, event: 'PathHidden' });
            undoUpdate();
        }; 
    }, [state]);

    const onClick = () => {
        setMutex(true);
        setSelfAni({ ...selfAni, type: state.playerTurn, event: 'PathVisible' });
        moveUpdate(gameID, index);
    }

    return <>
    <div className={clickable ? "CellMiniGame hover" : "CellMiniGame"} 
        onClick={clickable ? onClick : null}
    > 
        <div className='XONDrawer'>
            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'X' ? ('XPathDrawer ' + selfAni.event) : '')}  
                    style={{'--stroke-dasharray': '1.14'}} strokeLinecap='round' x1={0.1} y1={0.1} x2={0.9} y2={0.9}/>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'X' ? ('XPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'X' ? selfAni.onAnimationEnd : null} strokeDashoffset={selfAni.event === 'PathVisible' ? 1.14 : 0}
                    style={{animationDelay: '0.2s', '--stroke-dasharray': '1.14'}} strokeLinecap='round' x1={0.9} y1={0.1} x2={0.1} y2={0.9}/>
            </svg>
            
            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <ellipse 
                    className={'PathDrawer ' + (selfAni.type === 'O' ? ('OPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'O' ? selfAni.onAnimationEnd : null}
                    style={{animationDuration: '0.6s', '--stroke-dasharray': '2.41'}} transform='rotate(-90 0.5 0.5)' rx={0.4} ry={0.37} cx={0.5} cy={0.5}/>
            </svg>

            <svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'N' ? ('NPathDrawer ' + selfAni.event) : '')}  
                    style={{'--stroke-dasharray': '0.80'}} strokeLinecap='round' x1={0.1} y1={0.3} x2={0.9} y2={0.3}/>
                <line 
                    className={'PathDrawer ' + (selfAni.type === 'N' ? ('NPathDrawer ' + selfAni.event) : '')}  
                    onAnimationEnd={selfAni.type === 'N' ? selfAni.onAnimationEnd : null} strokeDashoffset={selfAni.event === 'PathVisible' ? 0.8 : 0}
                    style={{animationDelay: '0.3s', '--stroke-dasharray': '0.80'}} strokeLinecap='round' x1={0.1} y1={0.7} x2={0.9} y2={0.7}/>
            </svg>
        </div>
    </div>
    </>
}

export default CellMiniGame;