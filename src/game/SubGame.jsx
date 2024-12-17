import './SubGame.css';
import CellSubGame from './CellSubGame';

const SubGame = ({ gameID }) => {
    return <>
    <div className="SubGame">       
        <div className="CellSubGameCol">
            <div className="CellSubGameRow">
                <CellSubGame gameID={gameID} index={0}/>
                <div className='CellSubGameCenter'><CellSubGame gameID={gameID} index={1}/></div>
                <CellSubGame gameID={gameID} index={2}/>
            </div>
            <div className="CellSubGameRow middle">
                <CellSubGame gameID={gameID} index={3}/>
                <div className='CellSubGameCenter'><CellSubGame gameID={gameID} index={4}/></div>
                <CellSubGame gameID={gameID} index={5}/>
           </div>
            <div className="CellSubGameRow">
                <CellSubGame gameID={gameID} index={6}/>
                <div className='CellSubGameCenter'><CellSubGame gameID={gameID} index={7}/></div>
                <CellSubGame gameID={gameID} index={8}/>
            </div>
        </div>
    </div>
    </>
}

export default SubGame;