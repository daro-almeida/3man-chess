class ThreeManChess {

  constructor(x, y, diameter, tmfen) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.tmfen = tmfen;
    if(this.tmfen == 'start') 
      this.tmfen = '_24/_24/_24/_24/P-P-P-P-P-P-P-P-p-p-p-p-p-p-p-p-^p-^p-^p-^p-^p-^p-^p-^p-/RNBKQBNRrnbkqbnr^r^n^b^k^q^b^n^r/ w KQkq^k^q';

    this.rows = 6;
    this.cols = 24;

    this.colors = ['w','g','b']
    
    this.firstMoat = true;
    this.secondMoat = true;
    this.thirdMoat = true;
    
    this.spaces = Array(this.rows).fill().map(()=>Array(this.cols).fill());

    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        let piece = ThreeManChess.getPiece(i, j, this.tmfen);

        let radius = this.diameter/2
        let innerCircleRadius = radius * 0.23;
        let gap = radius * 0.95 - radius * 0.23;

        let v1 = [this.x + (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols))];

        let v2 = [this.x + (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols))];

        let v3 = [this.x + (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols))];

        let v4 = [this.x + (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols))];

        let spaceColor = ((((i % 2) == 1) && ((j % 2) == 0)) || (((i % 2) == 0) && ((j % 2) == 1))) ? 'b' : 'w'
        this.spaces[i][j] = new Space(v1, v2, v3, v4, i, j, spaceColor, piece);

        if(piece !== null)
          piece.space = this.spaces[i][j];
      }
    }

    this.turn = this.colors.indexOf(this.tmfen.split(' ')[1]) + 1;
  }
  
  static getPiece(row, col, tmfen) {
    //go to row
    let inRow = 0;
    let i = 0;
    while(inRow < row) {
      if (tmfen[i] == '/')
        inRow++;
      i++;
    }

    //go to piece
    let piece;
    let pieceColor;
    let inCol = 0;
    let j = 0
    let passedCenter;
    while(inCol <= col) {
      if (tmfen[i+j] == '_') {
        j++;
        let number = '';
        while(!isNaN(tmfen[i+j])) 
          number = number.concat(tmfen[i + j++]);
        inCol += parseInt(number);
        piece = null;
      } else if (tmfen[i+j] == '^') { //gray piece
        pieceColor = 'g';
        j++
        piece = tmfen[i+j++]
        if(piece == 'p') //check if pawn passed center
          passedCenter = (tmfen[i+j++] == 'c')
        inCol++;
      } else {
        pieceColor = (tmfen[i+j].toUpperCase() == tmfen[i+j]) ? 'w' : 'b'
        piece = tmfen[i+j++].toLowerCase();
        if(piece == 'p' || piece == 'P') //check if pawn passed center
          passedCenter = (tmfen[i+j++] == 'c')
        inCol++;
      }
    }
 
    switch(piece) {
      case 'p' : return new Pawn(pieceColor, undefined, passedCenter); 
      case 'r' : return new Rook(pieceColor);
      case 'n' : return new Knight(pieceColor);
      case 'b' : return new Bishop(pieceColor);
      case 'k' : return new King(pieceColor);
      case 'q' : return new Queen(pieceColor);
      default : return null;
    }
  }

  updateTmfen(castle, enPassant) {
    let pieceConfiguration = '';
    for(let i = 0; i < this.rows; i++) {
      let emptySpaces = 0;
      for(let j = 0; j < this.cols; j++) {
        let piece = this.spaces[i][j].piece;
        if(piece === null)
          emptySpaces++;
        else {
          if(emptySpaces > 0) {
            pieceConfiguration+='_'+emptySpaces
            emptySpaces = 0;
          }

          if(piece.color == 'w')
            pieceConfiguration += piece.letter.toUpperCase();
          else if(piece.color == 'g')
            pieceConfiguration += '^'+ piece.letter
          else
            pieceConfiguration += piece.letter

          if(piece instanceof Pawn) {
            let passed = (piece.passedCenter) ? 'c' : '-';
            pieceConfiguration += passed;
          }
        }
      }
      if(emptySpaces > 0)
        pieceConfiguration+='_'+emptySpaces
      pieceConfiguration+='/'
    }
  
    let tmfenArray = this.tmfen.split(' ');
    tmfenArray[0] = pieceConfiguration;
    tmfenArray[1] = this.colors[(this.turn-1).mod(this.colors.length)];

    this.tmfen = tmfenArray.join(' ');
  }

  getPiece(row, col) {
    return this.spaces[row][col].piece;
  }

  selectedPiece() {
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j< this.cols; j++) {
        if(this.spaces[i][j].piece !== null && this.spaces[i][j].piece.selected)
            return this.spaces[i][j].piece;
      }
    }
  }

  move(from, to, newTmfen) {
    this.spaces[from.row][from.col].piece.move(this.spaces[to.row][to.col], this);
    this.turn++;
    this.tmfen = newTmfen;
  }

  mouseClicked() {
    let clear = true;
    
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j< this.cols; j++) {
        if(dist(mouseX, mouseY, this.spaces[i][j].center()[0], this.spaces[i][j].center()[1]) < this.diameter * 0.025) {
          
          if(this.spaces[i][j].highlight) {
            let selectedPiece = this.selectedPiece();      
            let previousSpace = selectedPiece.space;
            
            selectedPiece.move(this.spaces[i][j], this)
            this.turn++;            

            this.updateTmfen();
            sock.emit('move', {row : previousSpace.row, col : previousSpace.col}, {row : i, col : j}, this.tmfen);
            
          } else {
            clear = false;
            
            //unmark all highlights
            for(let k = 0; k < this.rows; k++) {
              for(let l = 0; l < this.cols; l++) {
                this.spaces[k][l].highlight = false;
              }
            }

            //piece clicked event
            //only play color piece of its turn
            if(this.spaces[i][j].piece !== null && this.colors[(this.turn-1).mod(this.colors.length)] == this.spaces[i][j].piece.color)
              this.spaces[i][j].piece.mouseClicked(this)

            //unselect all other pieces
            for(let k = 0; k < this.rows; k++) {
              for(let l = 0; l < this.cols; l++) {
                if((k != i || l != j) && this.spaces[k][l].piece !== null)
                  this.spaces[k][l].piece.selected = false;
              }
            }  
          }
        
          break;
        }
      }
    }

    //unselect all pieces
    if(clear)
      for(let i = 0; i < this.rows; i++) {
        for(let j = 0; j < this.cols; j++) {
          if(this.spaces[i][j].piece !== null)
            this.spaces[i][j].piece.selected = false;
          this.spaces[i][j].highlight = false;
        }
      }
  }

  checkRooksForCastle() {
    
  }

  show() {

    //board
    fill(204,136,0)
    stroke(0);
    strokeWeight(2);
    ellipse(this.x,this.y,this.diameter)

    noFill()//fill(255,204,102);
    noStroke();
    ellipse(this.x,this.y,this.diameter*0.95)

    fill(204,136,0)
    noStroke();
    ellipse(this.x,this.y,this.diameter*0.23)

    let radius = this.diameter/2
    let innerCircleRadius = radius * 0.23;
    let gap = radius * 0.95 - radius * 0.23;

    //spaces
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {

        this.spaces[i][j].v1 = [this.x + (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols))];

        this.spaces[i][j].v2 = [this.x + (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*(i % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols))];

        this.spaces[i][j].v3 = [this.x + (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*((j+1) % this.cols))];

        this.spaces[i][j].v4 = [this.x + (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*cos(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols)), 
                  this.y - (innerCircleRadius + (gap/this.rows)*((i+1) % (this.rows + 1)))*sin(7*PI/6 + ((2*PI)/this.cols)*(j % this.cols))];

        this.spaces[i][j].show();
      }
    }

    //separators    
    stroke(0);
    strokeWeight(this.diameter * 0.0008);
    line(this.x, this.y, this.x + (innerCircleRadius + gap)*cos(7*PI/6), this.y - (innerCircleRadius + gap)*sin(7*PI/6))
    line(this.x, this.y, this.x + (innerCircleRadius + gap)*cos(11*PI/6), this.y - (innerCircleRadius + gap)*sin(11*PI/6))
    line(this.x, this.y, this.x + (innerCircleRadius + gap)*cos(15*PI/6), this.y - (innerCircleRadius + gap)*sin(15*PI/6))

    
    //curves
    noFill();
    strokeWeight(this.diameter * 0.0008);
    let colorsArray = ["yellow", "blue", "white", "black", "#00FFF7", "red", "#FF00F2", "#079B00"]
    let innerinnerCircleRadius = this.diameter * 0.023;
    for(let i = 0; i < this.cols; i++) {
      stroke(colorsArray[i % ((this.cols/3))])
      
      beginShape()

      curveVertex(this.spaces[this.rows-1][i].center()[0], this.spaces[this.rows-1][i].center()[1])
      curveVertex(this.spaces[this.rows-1][i].center()[0], this.spaces[this.rows-1][i].center()[1])

      curveVertex(this.spaces[this.rows-1][i].v1[0], this.spaces[this.rows-1][i].v1[1])
      let k = i-1;
      for(let j = this.rows - 2; j >= 0; j--, k--) {
        if(k < 0)
          k = this.cols - 1;
        curveVertex(this.spaces[j][k].v1[0], this.spaces[j][k].v1[1])
      }
      
      curveVertex(this.x + innerinnerCircleRadius*cos(5*PI/24 + i*PI/12), this.y - innerinnerCircleRadius*sin(5*PI/24 + i*PI/12))
      curveVertex(this.x + innerinnerCircleRadius*cos(5*PI/24 + i*PI/12), this.y - innerinnerCircleRadius*sin(5*PI/24 + i*PI/12))

      endShape()

      beginShape()

      curveVertex(this.spaces[this.rows-1][i].center()[0], this.spaces[this.rows-1][i].center()[1])
      curveVertex(this.spaces[this.rows-1][i].center()[0], this.spaces[this.rows-1][i].center()[1])

      curveVertex(this.spaces[this.rows-1][i].v2[0], this.spaces[this.rows-1][i].v2[1])
      k = i+1;
      for(let j = this.rows - 2; j >= 0; j--, k++) {
        if(k >= this.cols)
          k = 0;
        curveVertex(this.spaces[j][k].v2[0], this.spaces[j][k].v2[1])
      }
      
      curveVertex(this.x + innerinnerCircleRadius*cos(5*PI/24 + i*PI/12), this.y - innerinnerCircleRadius*sin(5*PI/24 + i*PI/12))
      curveVertex(this.x + innerinnerCircleRadius*cos(5*PI/24 + i*PI/12), this.y - innerinnerCircleRadius*sin(5*PI/24 + i*PI/12))
      
      endShape()
    }

    //creeks
    stroke(0,102,0);
    strokeWeight(this.diameter * 0.0024);
    line(this.x + (innerCircleRadius + (gap*(this.rows-3)/this.rows))*cos(7*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-3)/this.rows))*sin(7*PI/6), 
         this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(7*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(7*PI/6))
    
    line(this.x + (innerCircleRadius + (gap*(this.rows-3)/this.rows))*cos(11*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-3)/this.rows))*sin(11*PI/6), 
         this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(11*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(11*PI/6))
    
    line(this.x + (innerCircleRadius + (gap*(this.rows-3)/this.rows))*cos(15*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-3)/this.rows))*sin(15*PI/6), 
         this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(15*PI/6),
         this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(15*PI/6))

    //moats
    strokeWeight(this.diameter * 0.0048);

    if(this.firstMoat)
      line(this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(7*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(7*PI/6), 
          this.x + (innerCircleRadius + (gap*(this.rows)/this.rows))*cos(7*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows)/this.rows))*sin(7*PI/6))
    if(this.secondMoat)
      line(this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(11*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(11*PI/6), 
          this.x + (innerCircleRadius + (gap*(this.rows)/this.rows))*cos(11*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows)/this.rows))*sin(11*PI/6))
    
    if(this.thirdMoat)
      line(this.x + (innerCircleRadius + (gap*(this.rows-1)/this.rows))*cos(15*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows-1)/this.rows))*sin(15*PI/6), 
          this.x + (innerCircleRadius + (gap*(this.rows)/this.rows))*cos(15*PI/6),
          this.y - (innerCircleRadius + (gap*(this.rows)/this.rows))*sin(15*PI/6))

    //pieces
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.spaces[i][j].showPiece(this);
      }
    }
  }

  
}
