import './SubGame.css';
import useStateContext from "./StateContext";
import ODrawer from "../components/ODrawer";
import { useState } from 'react';

const SubGame = ({ gameID }) => {
    const { getSubGame } = useStateContext();
    const subGame = getSubGame(gameID);

    const getCellSubGame = (value) => <>
        <div>{isNaN(value) ? "" : value}</div>
    </>
    const [visible, setVisible] = useState(false);

    return <>
    <div className="SubGame">       
        <div className="CellSubGameCol">
            <div className="CellSubGameRow">
                <div className="CellSubGame" onClick={()=> setVisible(!visible)}>
                    <ODrawer visible={visible}/>
                </div>
                <div className="CellSubGame">
                    {getCellSubGame(subGame[1])}
                </div>
                <div className="CellSubGame">
                    {getCellSubGame(subGame[2])}
                </div>
            </div>
            <div className="CellSubGameRow">
                <div className="CellSubGame">{getCellSubGame(subGame[3])}</div>
                <div className="CellSubGame">{getCellSubGame(subGame[4])}</div>
                <div className="CellSubGame">{getCellSubGame(subGame[5])}</div>
            </div>
            <div className="CellSubGameRow">
                <div className="CellSubGame">{getCellSubGame(subGame[6])}</div>
                <div className="CellSubGame">{getCellSubGame(subGame[7])}</div>
                <div className="CellSubGame">{getCellSubGame(subGame[8])}</div>
            </div>
        </div>
    </div>
    </>
}

export default SubGame;