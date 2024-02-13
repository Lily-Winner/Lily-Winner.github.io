//board
const tileSize = 32;
const rows = 16;
const columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;

//ship
let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipVelocityX = tileSize; //ship moving speed

//aliens
let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienImg2;


let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; //number of aliens to defeat
let alienVelocityX = 1; //alien moving speed

//bullets
let bulletArray = [];
let bulletVelocityY = -10; //bullet moving speed

let score = 0;
let gameOver = false;

window.onload = function(){
  gameStart();
}

let gameStart = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial ship
    // context.fillStyle="green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);

    //load images
    shipImg = new Image();
    shipImg.src = "./space/ship.png";
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg2 = new Image();
    alienImg.src = "./space/alien_space.png";
    alienImg2.src = "./space/alien2_space.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
}

function update() {
    
  if (gameOver) {

    // Display game over message
    context.fillStyle = "white";
    context.font = "32px courier";
    context.fillText("Game Over", board.width / 2 - 100, board.height / 2 - 16);

    // Reset the game after a delay (you can adjust the delay as needed)
    setTimeout(function () {
      resetGame();
    }, 1500); // 3000 milliseconds (3 seconds) delay before resetting
    return;
  }
  requestAnimationFrame(update);

  context.clearRect(0, 0, board.width, board.height);

  //ship
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

  //alien
  let borderHit = false;

  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
      alien.x += alienVelocityX;

      //if alien touches the borders
      if (alien.x + alien.width >= board.width || alien.x <= 0) {
        borderHit = true;
      }
      context.drawImage(alien.img, alien.x, alien.y, alien.width, alien.height);

      if (alien.y >= ship.y) {
        gameOver = true;
      } // border hit
    } // if alive
  } // for loop
  
  if (borderHit) {
    borderHit = false;
    alienVelocityX *= -1;
    //move all aliens up by one row
    for (let j = 0; j < alienArray.length; j++) {
      alienArray[j].y += alienHeight;
    }
  }

    //bullets
    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle="white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        //bullet collision with aliens
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        }
    }

    //clear bullets
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift(); //removes the first element of the array
    }

    //next level
    if (alienCount == 0) {
        //increase the number of aliens in columns and rows by 1
        score += alienColumns * alienRows * 100; //bonus points :)
        alienColumns = Math.min(alienColumns + 1, columns/2 -2); //cap at 16/2 -2 = 6
        alienRows = Math.min(alienRows + 1, rows-4);  //cap at 16-4 = 12
        if (alienVelocityX > 0) {
            alienVelocityX += 0.2; //increase the alien movement speed towards the right
        }
        else {
            alienVelocityX -= 0.2; //increase the alien movement speed towards the left
        }
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    //score
    context.fillStyle="white";
    context.font="30px courier";
    context.fillText(score, 250, 20);

    //controls
    context.fillStyle="white";
    context.font="16px courier";
    context.fillText("Press Space to shoot, navigation... is as always:)", board.width / 2 - 245, 500);
}

function moveShip(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX; //move left one tile
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX; //move right one tile
    }
}

function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
          if ((alienArray.length + c)%2) {
            let alien = {
              img : alienImg,
              x : alienX + c*alienWidth,
              y : alienY + r*alienHeight,
              width : alienWidth,
              height : alienHeight,
              alive : true
            }
            alienArray.push(alien);
          }
          else {
            let alien = {
              img : alienImg2,
              x : alienX + c*alienWidth,
              y : alienY + r*alienHeight,
              width : alienWidth,
              height : alienHeight,
              alive : true
            }
            alienArray.push(alien);
          }
        }
    }
    alienCount = alienArray.length;
}



function shoot(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "Space") { //KeyX
        //shoot
        let bullet = {
            x : ship.x + shipWidth*15/32,
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false
        }
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}


function resetGame() {
  // Reset game variables
  score = 0;
  gameOver = false;

  //aliens
  alienArray = [];
  alienWidth = tileSize*2;
  alienHeight = tileSize;
  alienX = tileSize;
  alienY = tileSize;

  alienRows = 2;
  alienColumns = 3;
  alienCount = 0; //number of aliens to defeat
  alienVelocityX = 1; //alien moving speed


  // Reset ship position
  ship.x = shipX;
  ship.y = shipY;

  // Reset aliens and bullets
  bulletArray = [];
  createAliens();
  requestAnimationFrame(update);
  // Resume the game loop
  //gameStart();
}

document.addEventListener("keydown", function(event) {
  // Check if the pressed key is the space key
  if (event.code === "Space") {
    // Prevent the default behavior (scrolling down the page)
    event.preventDefault();
  }
});


setInterval(function(){
  if (gameOver == false) {
    for (let i=0; i < alienArray.length; i++){
      if (alienArray[i].img == alienImg) {
        alienArray[i].img = alienImg2;
      } else {
        alienArray[i].img = alienImg;
      }
    }
  }
}, 500);