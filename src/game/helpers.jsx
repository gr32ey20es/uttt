const createNewPlayerTurn = () => 'X';
const createNewGameTurn = () => null;   // null, 1-9
const createNewGame = () => new Array(9).fill(null);
const createNewSubGames = () => Array.from({length: 9}, (_) => createNewGame())
const createNewPrevMoves = () => [];

export { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames,
    createNewPrevMoves
};