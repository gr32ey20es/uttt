import './MiniGame.css';
import CellMiniGame from './CellMiniGame';

const MiniGame = ({ gameID }) => {
    return <>
    <div className="MiniGame">       
        <div className="CellMiniGameCol">
            <div className="CellMiniGameRow">
                <CellMiniGame gameID={gameID} index={0}/>
                <div className='CellMiniGameCenter'><CellMiniGame gameID={gameID} index={1}/></div>
                <CellMiniGame gameID={gameID} index={2}/>
            </div>
            <div className="CellMiniGameRow middle">
                <CellMiniGame gameID={gameID} index={3}/>
                <div className='CellMiniGameCenter'><CellMiniGame gameID={gameID} index={4}/></div>
                <CellMiniGame gameID={gameID} index={5}/>
           </div>
            <div className="CellMiniGameRow">
                <CellMiniGame gameID={gameID} index={6}/>
                <div className='CellMiniGameCenter'><CellMiniGame gameID={gameID} index={7}/></div>
                <CellMiniGame gameID={gameID} index={8}/>
            </div>
        </div>
    </div>
    </>
}

export default MiniGame;