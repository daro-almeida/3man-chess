class King extends Piece {
    constructor(color, space) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}K.png`;
        this.img = loadImage(imgLink);
        this.letter = 'k'
    }

    generateMoves(board) {
        let moves = [];

        let spaceToMove;

        //up
        spaceToMove = this.space.up(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //left
        spaceToMove = this.space.left(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //right
        spaceToMove = this.space.right(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //diagonal-up-left
        spaceToMove = this.space.diagonal_up_left(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //diagonal-up-right
        spaceToMove = this.space.diagonal_up_right(board);
        if(spaceToMove.piece === null || spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        //down
        spaceToMove = this.space.down(board);
        if(spaceToMove !== null && (spaceToMove.piece === null || spaceToMove.piece.color != this.color))
            moves.push(spaceToMove)

        //diagonal-down-left
        spaceToMove = this.space.diagonal_down_left(board);
        if(spaceToMove !== null && (spaceToMove.piece === null || spaceToMove.piece.color != this.color))
            moves.push(spaceToMove)

        //diagonal-down-right
        spaceToMove = this.space.diagonal_down_right(board);
        if(spaceToMove !== null && (spaceToMove.piece === null || spaceToMove.piece.color != this.color))
            moves.push(spaceToMove)

        let castlePart = board.tmfen.split(' ')[2];
        let kingRegex;
        let queenRegex;
        if(this.color == 'w') {
            kingRegex = /K/
            queenRegex = /Q/
        } else if(this.color == 'g') {
            kingRegex = /\^k/
            queenRegex = /\^q/
        } else {
            kingRegex = /k/;
            queenRegex = /q/;
        }
        //king side castle
        if(kingRegex.test(castlePart) &&
           this.space.left(board).piece === null && 
           this.space.left(board).left(board).piece === null && 
           this.space.left(board).left(board).left(board).piece instanceof Rook) 
            moves.push(this.space.left(board).left(board))

        //queen side castle
        //if(castle) &&
        if(queenRegex.test(castlePart) &&
           this.space.right(board).piece === null &&
           this.space.right(board).right(board).piece === null &&
           this.space.right(board).right(board).right(board).piece == null && 
           this.space.right(board).right(board).right(board).right(board).piece instanceof Rook) 
            moves.push(this.space.right(board).right(board))

        return moves;
    }

    move(spaceToMove, board) {
        let dist = this.space.col - spaceToMove.col;

        super.move(spaceToMove);
        
        //king side castle
        if(dist == 2) {
            let castlingRook = this.space.left(board).piece
            castlingRook.move(this.space.right(board), board)
        //queen side castle
        } else if (dist == -2) { 
            let castlingRook = this.space.right(board).right(board).piece
            castlingRook.move(this.space.left(board), board)
        }

        let kingRegex;
        let queenRegex;
        if(this.color == 'w') {
            kingRegex = /K/
            queenRegex = /Q/
        } else if(this.color == 'g') {
            kingRegex = /\^k/
            queenRegex = /\^q/
        } else {
            kingRegex = /k/
            queenRegex = /q/
        }

        let tmfenArray = board.tmfen.split(' ');
        tmfenArray[2] = tmfenArray[2].replace(kingRegex, '');
        tmfenArray[2] = tmfenArray[2].replace(queenRegex, '');
        tmfenArray[2] = (tmfenArray[2] == '') ? '-' : tmfenArray[2];
        board.tmfen = tmfenArray.join(' ')
    }
}