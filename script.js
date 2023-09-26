
window.onload = function () {
    let initializer = document.getElementById('initializer');
    let start_btn = document.getElementById('startBtn');

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    start_btn.style.width = '150px'
    start_btn.style.height = '50px'
    initializer.style.marginTop = ((screenHeight/2)-(50/2))+'px';
}


// Defining the game class
class Game {
    constructor(base=[], balls=[], bricks=[]) {
        this.base = base;
        this.balls = balls;
        this.bricks = bricks;

        this.dim_base = [70, 7, 20];
        this.complexityArrangementBrick = 0.1;

    }

    storeCtx(ctx) { this.ctx = ctx }
    Radius(radius) { this.ballRadius = radius }

    drawBase(position) {

        this.xPosition_base = position;
        this.yPosition_base = this.canvas_height - this.dim_base[2];

        this.ctx.beginPath();
        this.ctx.fillStyle = '#000';
        this.ctx.rect(this.xPosition_base, this.yPosition_base, this.dim_base[0], this.dim_base[1]);
        this.ctx.fill();
        this.ctx.closePath();

        this.reflect()

    }

    reflect() {
        return this.xPosition_base;
    }

    updateBallsPosition() {

        //
        
    }

    drawBall(x, y, vx, vy) {

        this.xSpeed = vx;
        this.ySpeed = vy;
        this.xPosition_ball = x;
        this.yPosition_ball = y;

        this.ctx.beginPath();
        this.ctx.fillStyle = '#f00';
        this.ctx.arc(this.xPosition_ball, this.yPosition_ball, this.ballRadius, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        this.updateBallsPosition();

    }

    positionBrick(img, x, y) {
        this.brick = img;
        this.blockDim = [this.brick.width, this.brick.height];
        this.xPosition_bricks = x;
        this.yPosition_bricks = y;

        let dim = [this.xPosition_bricks, this.yPosition_bricks]

        for(let i = 0; i < x.length; i++) {
            this.ctx.beginPath();
            this.ctx.drawImage(img, x[i], y[i]);
            this.ctx.closePath();

        }

        

    }

    getCanvasDim(canvas) {
        this.canvas_width = canvas.width;
        this.canvas_height = canvas.height;
    }

    print(place) { this.place = place }
    showValue(val, text='') {
        if (text != '') { 
            return this.place.innerHTML = text + ': ' + val 
        } else { 
            return this.place.innerHTML = val 
        } 
    }

}


let game = new Game();

function start() {
    let initializer = document.getElementById('initializer');
    let game_div = document.getElementById('gameDiv');
    let end_game = document.getElementById('end');
    let mover = document.getElementById('mover');

    initializer.style.display = 'none';
    game_div.style.display = 'block';

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    let radius = 8;

    let img = document.getElementById('brick');

    let xPos_brick = random(0, random(8, 11, 1, 1), 1, 5);
    xPos_brick = xPos_brick.map(val => { return img.width*val });

    let yPos_brick = random(0, random(5, 11, 1, 1), 1, 5);
    yPos_brick = yPos_brick.map(val => { return img.height*val });

    game.getCanvasDim(canvas);
    game.storeCtx(context);
    game.print(document.getElementById('checker'));

    let pos = document.getElementById('position'); 
    pos.min = 0;
    pos.max = canvas.width-70;
    pos.value = ((canvas.width/2) - (70/2));

    game.positionBrick(img, xPos_brick, yPos_brick);
    game.drawBase(pos.value);
    game.Radius(radius);
    game.drawBall();

    let x = 215+(70/2);
    let y = canvas.height-radius-20;
    let vx = 1;
    let vy = -5;

    let xbase = 215+(70/2);

    changeBallPosition();

    let c = [];
    function changeBallPosition() {
        requestAnimationFrame(changeBallPosition);

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (radius + x > canvas.width) { vx = -vx; }
        if (x - radius < 0) { vx = -vx; }
        //if (radius + y > canvas.height) { vy = -vy; }
        if (y - radius < 0) { vy = -vy; }

        if (radius + y <= canvas.height) {
             x += vx; y += vy;
        }else {
            canvas.style.opacity = .4;
            end_game.style.display = 'block';
            mover.style.display = 'none';
        }

        //x += vx; y += vy;
        game.positionBrick(img, xPos_brick, yPos_brick);
        game.drawBase(pos.value);
        game.drawBall(x, y, vx, vy);
        xbase = game.reflect();

        if ((x >= parseInt(xbase)-3 && x < parseInt(xbase)+70+3) && (y == (canvas.height - 20 - radius))) {
            vy = -vy;
        }

        for (var i = 0; i < xPos_brick.length; i++) {
            if ((y-radius) < (yPos_brick[i]+img.height) && (x-radius > xPos_brick[i] && x-radius < xPos_brick[i]+img.width)) {
                vy = -vy;

                xPos_brick.splice(i, i+1);
            }

            if ((y-radius) < (yPos_brick[i]) && (x-radius > xPos_brick[i] && x-radius < xPos_brick[i]+img.width)) {
                vy = -vy;

                xPos_brick.splice(i, i+1);
            }

            

        }

    }
}

function update() {
    let pos = document.getElementById('position'); 

    game.drawBase(pos.value);

}

function random(start, stop, step, n) {

    let arr = [];
    let randomized = [];

    if ((stop-start-1) % step == 0) {
    
        for (let i = start; i < stop; i+=step) {
            arr.push(i)
        }

        for (let i = 0; i < n; i++) {
            var rand = Math.floor(Math.random()*arr.length);
            randomized.push(arr[rand]) 
        }

        return randomized;
    }else {
        return false;
    }

}