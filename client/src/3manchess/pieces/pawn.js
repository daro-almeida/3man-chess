class Pawn extends Piece {
    constructor(color, space, passedCenter) {
        super(color, space);

        let imgLink = `img/chesspieces/${color}P.png`;
        this.img = loadImage(imgLink);
        this.letter = 'p'

        this.passedCenter = passedCenter;
    }

    generateMoves(board) {
        let moves = []
        let thisRow = this.space.row;
        let thisCol = this.space.col;

        let spaceToMove;

        if(this.passedCenter) {
            //front move
            spaceToMove = this.space.down(board);
            if(spaceToMove.piece == null)
                moves.push(spaceToMove)

            //diagonal moves
            spaceToMove = this.space.diagonal_down_left(board);
            if(spaceToMove.piece !== null && 
                spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

            spaceToMove = this.space.diagonal_down_right(board);
            if(spaceToMove.piece !== null && 
                spaceToMove.piece.color != this.color)
            moves.push(spaceToMove)

        } else {
            //front move
            spaceToMove = this.space.up(board);
            if(spaceToMove.piece == null)
                moves.push(spaceToMove)

            //double front move
            if(thisRow == 4) {
                spaceToMove = this.space.up(board).up(board);
                if(spaceToMove.piece == null && this.space.up(board).piece == null) 
                    moves.push(spaceToMove)
            }

            //diagonal moves
            spaceToMove = this.space.diagonal_up_left(board);
            if(spaceToMove.piece !== null && 
               spaceToMove.piece.color != this.color) {
                if(!((thisCol % (board.cols/3)) == 0  && (thisRow == 3 || thisRow == 4)))
                    moves.push(spaceToMove)
            }

            spaceToMove = this.space.diagonal_up_right(board);
            if(spaceToMove.piece !== null && 
                spaceToMove.piece.color != this.color) {
                if(!(((thisCol+1).mod(board.cols) % (board.cols/3)) == 0 && (thisRow == 3 || thisRow == 4)))
                    moves.push(spaceToMove)
            }
        } 
               
        return moves;
    }

    move(spaceToMove, board) {
        if(this.space.row == 0 && spaceToMove.row == 0)
            this.passedCenter = true;

        super.move(spaceToMove);

        if(this.space.row == board.rows-1) {
            this.space.piece = new Queen(this.color, this.space)
            this.space = undefined;
        }
    }
}