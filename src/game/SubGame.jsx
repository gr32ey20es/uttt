import './SubGame.css';
import { useEffect, useState } from 'react';
import useStateContext from "./StateContext";
import ODrawer from "../components/ODrawer";
import XDrawer from "../components/XDrawer";

const SubGame = ({ gameID }) => {
    const { gameTurn, subGames, updateGame } = useStateContext();
    let subGame = subGames[gameID];

    useEffect(()=> {subGame = subGames[gameID]}, [subGames[gameID][0]]);
    return <>
    <div className="SubGame">       
        <div className="CellSubGameCol">
            <div className="CellSubGameRow">
                <div className={gameTurn === gameID ? "CellSubGame hover" : "CellSubGame"} 
                    onClick={gameTurn === gameID ? () => updateGame(gameID, 0) : () => {}}
                > 
                    <div> <ODrawer visible={subGame[0] === 'O' ? true : null}/> </div>
                    <div> <XDrawer visible={subGame[0] === 'X' ? true : null}/> </div>
                </div>

                <div className="CellSubGame center">{subGame[1]}</div>
                <div className="CellSubGame">{subGame[2]}</div>
            </div>
            <div className="CellSubGameRow middle">
                <div className="CellSubGame">{subGame[3]}</div>
                <div className="CellSubGame center">{subGame[4]}</div>
                <div className="CellSubGame">{subGame[5]}</div>
            </div>
            <div className="CellSubGameRow">
                <div className="CellSubGame">{subGame[6]}</div>
                <div className="CellSubGame center">{subGame[7]}</div>
                <div className="CellSubGame">{subGame[8]}</div>
            </div>
        </div>
    </div>
    </>
}

export default SubGame;