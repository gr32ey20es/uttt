const createNewPlayerTurn = () => 'X';
const createNewGameTurn = () => null;
const createNewGame = () => new Array(9);
const createNewSubGames = () => Array.from({length: 9}, (_) => createNewGame())

const updatePlayerTurn = (turn) => isXTurn(turn) ? 'O' : 'X';
const updateGame = (game, turn, index) => {
    let updatedGame = [...game];

    updatedGame[index] = turn;
    return updatedGame;
}

const isXTurn = (turn) => turn === "X";

export { 
    createNewPlayerTurn, createNewGameTurn,
    createNewGame, createNewSubGames, 
    updatePlayerTurn, updateGame,
    isXTurn
};