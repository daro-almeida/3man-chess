class Knight extends Piece {
    constructor(color, space) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}N.png`;
        this.img = loadImage(imgLink);
        this.letter = 'n'
    }

    generateMoves(board) {
        let moves = [];

        let spaceToMove;

        //up-up-left
        if(this.space.row == 0)
            spaceToMove = this.space.up(board).down(board).left(board);
        else
            spaceToMove = this.space.up(board).up(board).left(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //up-up-right
        if(this.space.row == 0)
            spaceToMove = this.space.up(board).down(board).right(board);
        else
            spaceToMove = this.space.up(board).up(board).right(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)
        
        //up-left-left
        spaceToMove = this.space.up(board).left(board).left(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //up-right-right
        spaceToMove = this.space.up(board).right(board).right(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //down-down-left
        spaceToMove = this.space.down(board)
        if(spaceToMove !== null) {
            spaceToMove = spaceToMove.down(board)
            if(spaceToMove !== null) {
                spaceToMove = spaceToMove.left(board);
                if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
                    moves.push(spaceToMove)
            }
        }

        //down-down-right
        spaceToMove = this.space.down(board)
        if(spaceToMove !== null) {
            spaceToMove = spaceToMove.down(board)
            if(spaceToMove !== null) {
                spaceToMove = spaceToMove.right(board);
                if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
                    moves.push(spaceToMove)
            }
        }

        //down-left-left
        spaceToMove = this.space.down(board)
        if(spaceToMove !== null) {
            spaceToMove = spaceToMove.left(board).left(board)
            if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
                moves.push(spaceToMove)        
        }

        //down-right-right
        spaceToMove = this.space.down(board)
        if(spaceToMove !== null) {
            spaceToMove = spaceToMove.right(board).right(board)
            if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
                moves.push(spaceToMove)        
        }

        return moves;
    }
}