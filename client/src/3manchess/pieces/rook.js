class Rook extends Piece {
    constructor(color, space) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}R.png`;
        this.img = loadImage(imgLink);
        this.letter = 'r'
    }

    generateMoves(board) {
        let moves = []

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
            
        return moves;
    }
}