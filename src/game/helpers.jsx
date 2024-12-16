const createNewPlayerTurn = () => 'X';
const createNewGameTurn = () => 0;
const createNewGame = () => new Array(9);
const createNewSubGames = () => Array.from({length: 9}, (_) => createNewGame())

const updatePlayerTurn = (turn) => isXTurn(turn) ? 'O' : 'X';

const isXTurn = (turn) => turn === "X";

export { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames, 
    updatePlayerTurn,
    isXTurn
};