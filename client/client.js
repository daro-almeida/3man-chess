let board1;
const OFFSET = 20;
const BOARDOFFEST = 25;

function setup() {
    createCanvas(windowWidth-OFFSET, windowHeight-OFFSET);

    let diameter;
    if(windowWidth > windowHeight)
        diameter = windowHeight - BOARDOFFEST;
    else
        diameter = windowWidth - BOARDOFFEST;
    board1 = new ThreeManChess((windowWidth-OFFSET)/2, (windowHeight-OFFSET)/2, diameter, 'start');
}

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function windowResized() {
    resizeCanvas(windowWidth-OFFSET, windowHeight-OFFSET);
    board1.x = (windowWidth-OFFSET)/2
    board1.y = (windowHeight-OFFSET)/2
    if(windowWidth > windowHeight) 
        board1.diameter = windowHeight - BOARDOFFEST;
    else
        board1.diameter = windowWidth - OFFSET;
}

function draw() {
    colorMode(RGB, 255, 255, 255)
    background(153,76,0);
    board1.show();
}

function mouseClicked() {
    board1.mouseClicked();
}