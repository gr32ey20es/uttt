class Helpers {
    static whoIsWinner(board, offset = 0) 
    {   // offset: board_offset
        let i, value;

        for(i = 0; i < 3; i++) 
        {
            value = board[offset + 0 + i];
            if(value !== null 
            && value === board[offset + 3 + i] 
            && value === board[offset + 6 + i]) return value;

            value = board[offset + 0 + 3*i];
            if(value !== null 
            && value === board[offset + 1 + 3*i] 
            && value === board[offset + 2 + 3*i]) return value;
        }

        value = board[offset + 4]
        if(value !== null 
        &&  (
                (value === board[offset + 0] && value === board[offset + 8]) 
            ||  (value === board[offset + 2] && value === board[offset + 6])    
            )   
        ) return value;
            
        for(i = 0; i < 9; i++) 
            if(board[offset + i] === null) return null;

        return 'N';
    }

    static whoIsWinnerSuper(board, action = null) 
    {
        if (action !== null) {
            let boardID = Math.floor(action / 9);
            board[81 + boardID] = this.whoIsWinner(board, boardID * 9);
        } else
            for (let boardID = 0; boardID < 9; ++boardID) 
                board[81 + boardID] = this.whoIsWinner(board, boardID * 9);

        return this.whoIsWinner(board, 81);
    }

    static getLegalActions(board, legalActions, prevAction = null) 
    {
        if (prevAction === null)
            legalActions.push(...Array(81).keys());
        else {
            let boardID = prevAction % 9;
            let boardIDx9 = 9 * boardID;

            if (board[81 + boardID] === null) {
                for (let i = 0; i < 9; ++i)
                    if (board[boardIDx9 + i] === null)
                        legalActions.push(boardIDx9 + i);
            } 
            else
            for (boardID = 0; boardID < 9; ++boardID) {
                if (board[81 + boardID] !== null) continue;
                boardIDx9 = 9 * boardID;

                for (let i = 0; i < 9; ++i)
                    if (board[boardIDx9 + i] === null)
                        legalActions.push(boardIDx9 + i);
            }
        }
    }

    static print(board) {
        for (let boardID = 0; boardID < 9; ++boardID) {
            let boardIDx9 = 9 * boardID;
            let str = "";

            for (let i = 0; i < 9; ++i)
                str = str + board[boardIDx9 + i] + " ";

            str = str + board[81 + boardID];

            console.log(str);
        }
    }
}

export { Helpers };