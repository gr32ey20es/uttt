const whoIsWinner = (game) => {
    let winner = null;

    for(let i = 0; i < 3; i++) {
        if(game[0 + i] !== null && game[0 + i] === game[3 + i] && game[3 + i] === game[6 + i])
            winner = game[0 + i];
        if(game[0 + 3*i] !== null && game[0 + 3*i] === game[1 + 3*i] && game[1 + 3*i] === game[2 + 3*i])
            winner = game[0 + 3*i];
    }

    if(game[4] !== null && 
    (   (game[0] === game[4] && game[4] === game[8]) 
    ||  (game[2] === game[4] && game[4] === game[6])    )   )
        winner = game[4];

    if(winner !== null) return winner;
    
    winner = 'N';
    for(let i = 0; i < 9; i++) 
        if(game[i] === null) winner = null;

    return winner;
}

export { whoIsWinner };