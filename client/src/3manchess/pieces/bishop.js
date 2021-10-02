class Bishop extends Piece {
    constructor(color, space) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}B.png`;
        this.img = loadImage(imgLink);
        this.letter = 'b'
    }

    generateMoves(board) {
        let moves = []

        //up-left
        let currSpace = this.space.diagonal_up_left(board);
        let goingUp = !(this.space.row == 0);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            if(goingUp) {
                if(currSpace.row == 0)
                    goingUp = false;
                currSpace = currSpace.diagonal_up_left(board);
            } else {
                currSpace = currSpace.diagonal_down_left(board);
            }
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

        //up-right
        currSpace = this.space.diagonal_up_right(board);
        goingUp = !(this.space.row == 0);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            if(goingUp) {
                if(currSpace.row == 0)
                    goingUp = false;
                currSpace = currSpace.diagonal_up_right(board);
            } else {
                currSpace = currSpace.diagonal_down_right(board);
            }
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

         //down-left
         currSpace = this.space.diagonal_down_left(board);
         while(currSpace !== null && currSpace.piece === null) {
             moves.push(currSpace);
             currSpace = currSpace.diagonal_down_left(board);
         }
         if(currSpace !== null && currSpace.piece.color != this.color)
             moves.push(currSpace)

         //down-right
         currSpace = this.space.diagonal_down_right(board);
         while(currSpace !== null && currSpace.piece === null) {
             moves.push(currSpace);
             currSpace = currSpace.diagonal_down_right(board);
         }
         if(currSpace !== null && currSpace.piece.color != this.color)
             moves.push(currSpace)
            
        return moves;
    }
}