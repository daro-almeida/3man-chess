class Piece {
    constructor(color, space) {
        this.color = color;
        this.space = space;
        this.selected = false;
    }

    show(board) {
        if(this.space !== undefined) {      
            imageMode(CENTER);
            image(this.img, this.space.center()[0], this.space.center()[1], board.diameter * 0.05, board.diameter * 0.05);

            if(this.selected) {
                stroke(255,0,0)
                strokeWeight(board.diameter * 0.0025)
                circle(this.space.center()[0], this.space.center()[1], board.diameter * 0.05)
            }
        }
    }

    mouseClicked(board) {
        let moves = []
        if(!this.selected) {
            moves = this.generateMoves(board);

            if(moves.length > 0) {
                moves.forEach(move => {
                    move.highlight = true;
                })                
            }

            this.selected = true;
        }
        else
            this.selected = false;

    }

    move(spaceToMove, board) {

        spaceToMove.piece = this;
        this.space.piece = null;
        this.space = spaceToMove
        
        for(let i = 0; i < board.rows; i++) {
            for(let j = 0; j < board.cols; j++) {
                board.spaces[i][j].highlight = false;
                if(board.spaces[i][j].piece !== null)
                    board.spaces[i][j].piece.selected = false;
            }   
        }
    }
} 