class Space {
    constructor(v1, v2, v3, v4, row, col, spaceColor, piece) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
        this.row = row;
        this.col = col;
        this.spaceColor = spaceColor;
        this.piece = piece;
        this.highlight = false;
    }

    center() {
        let x = (this.v1[0] + this.v2[0] + this.v3[0] + this.v4[0])/4 ;
        let y = (this.v1[1] + this.v2[1] + this.v3[1] + this.v4[1])/4 ;

        return [x,y];
    }

    left(board) {
        return board.spaces[this.row][(this.col-1).mod(board.cols)]
    }

    right(board) {
        return board.spaces[this.row][(this.col+1).mod(board.cols)]
    }

    up(board) {
        if(this.row > 0)
            return board.spaces[this.row-1][this.col];
        else   
            return board.spaces[this.row][(this.col + board.cols/2).mod(board.cols)];
    }

    down(board) {
        if(this.row < board.rows - 1)
            return board.spaces[this.row+1][this.col]
        else
            return null;
    }

    diagonal_up_left(board) {
        if(this.row > 0)
            return this.up(board).left(board);
        else
            return board.spaces[this.row][(this.col + board.cols/2 - 2).mod(board.cols)];
    }

    diagonal_up_right(board) {
        if(this.row > 0)
            return this.up(board).right(board);
        else
            return board.spaces[this.row][(this.col + board.cols/2 + 2).mod(board.cols)];
    }

    diagonal_down_left(board) {
        return (this.down(board) === null) ? null : this.down(board).left(board)
    }

    diagonal_down_right(board) {
        return (this.down(board) === null) ? null : this.down(board).right(board)
    }

    show() {
        if(this.spaceColor == 'w') {
            if(this.highlight) {
                fill(255,143,71)

            } else
                fill(255,204,102);
        }
        else if (this.spaceColor == 'b') {
            if(this.highlight) {
                fill(156,40,0)
  
            } else
                fill(114,57,0);
        }

        beginShape();
        vertex(this.v1[0], this.v1[1]);
        vertex(this.v2[0], this.v2[1]);
        vertex(this.v3[0], this.v3[1])
        vertex(this.v4[0], this.v4[1])
        endShape()

        noFill()
        noStroke()
    }

    showPiece(board) {
        if(this.piece !== null)
            this.piece.show(board);
    }
} 