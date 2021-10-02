class Queen extends Piece {
    constructor(color, space) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}Q.png`;
        this.img = loadImage(imgLink);
        this.letter = 'q'
    }

    generateMoves(board) {
        let moves = [];

        //up
        let currSpace = this.space.up(board);
        let goingUp = !(this.space.row == 0);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            if(goingUp) {
                if(currSpace.row == 0)
                    goingUp = false;
                currSpace = currSpace.up(board);
            } else {
                currSpace = currSpace.down(board);
            }
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

        //down
        currSpace = this.space.down(board);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            currSpace = currSpace.down(board);
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

        //left
        currSpace = this.space.left(board);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            currSpace = currSpace.left(board);
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

        //right
        currSpace = this.space.right(board);
        while(currSpace !== null && currSpace.piece === null) {
            moves.push(currSpace);
            currSpace = currSpace.right(board);
        }
        if(currSpace !== null && currSpace.piece.color != this.color)
            moves.push(currSpace)

        //up-left
        currSpace = this.space.diagonal_up_left(board);
        goingUp = !(this.space.row == 0);
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

        return moves
    }
}