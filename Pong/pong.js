//intialize players and ball
const player = document.getElementById('player');
const ball = document.getElementById('ball');
const ai = document.getElementById('ai');

//intialize positions and velocity
var speed = 8;  //player speed
var top = 40;
var aiTop = 40;
var offset = 0.04;
var ballVelocity = {x:0.5, y:0.1};
var bx = 1;
var by = Math.round(Math.random()*97); //generate random y-coordinate for ball
let score = 0;
const scoreTxt = document.getElementById('score');
let moveDir = 0;
var aiSpeed = 2;  //ai speed
var disY = 0;
var aiSlowness = 4;
var aiCount = 0;
let halt = false;
moveAI();


//Player movement using WS keys
window.addEventListener('keydown', e =>{
    switch(e.code){
        case "KeyW":
            if(top > 0) {player.style.top = (top -= speed)+'%';}
            break;
        case "KeyS":
            if(top < 80) {player.style.top = (top += speed)+'%';}
            break;
    }
});

//upBtn.addEventListener('mousedown',function(){moveDir=-1;});
//downBtn.addEventListener('mousedown',function(){moveDir=1;});

var bounce = setInterval(function() {
    //if game over stop bouncing
    if (halt)return;

    //change current ball coordinate by adding ballVelocity
    ball.style.top = (by += ballVelocity.y) + '%';
    ball.style.left = (bx += ballVelocity.x) + '%';

    top += moveDir * speed;
    if (top < 0) {top = 0;}
    else if(top > 80) {top = 80;}
    player.style.top = top + '%';

    if(aiCount == aiSlowness){
        if (aiTop < disY) {aiTop += aiSpeed;}
        else if (aiTop > disY) {aiTop -= aiSpeed;}
        ai.style.top = aiTop+"%";
        aiCount = 0;
    }
    else
        aiCount++;

    moveDir = 0;
    if(bx >= 93 || bx <= 1){
        if(ballVelocity.x < 3){
            ballVelocity.x*=-1;
            if(!halt)
                checkColl();
        }
        //console.log(ballVelocity);
    }
    if(by >= 96 || by <= 0){
        ballVelocity.y*=-1;
    }
}, 10);

//Ai movement
function moveAI(){
    //track ball velocity
    let x = ballVelocity.x;
    let y = ballVelocity.y;

    let time = Math.abs(93.5/x);
    //console.log(time);

    //calc ball position and velocity time
    disY = by + y * time;
    while (disY > 96 || disY < 0){
    if (disY > 96){
        disY = 192 - disY; /*96-((disY-by)-(96-by));*/}
    else if (disY < 0)
        disY =- 1 * (disY);
    }

    disY = Math.round(disY);
    disY = disY - 10;
    //if negative settle for 0
    if(disY < 0)
        disY = 0;
    //if over 80 settle for 80
    else if (disY > 80)
        disY = 80;
    console.log(disY);
    disY += disY % aiSpeed;
    /*aiTop=disY;
    ai.style.top=aiTop+"%";*/

}

//check Collisions
function checkColl(){
    if(bx < 50){ //player
        let pos = by - top;
        if(pos <= 19 && pos >= -3){
            //console.log('hit');
            pos = pos - 8;
            ballVelocity.y += (pos * offset);
            scoreTxt.innerHTML = 'score ' + (++score);
            //ballVelocity.x+=0.1;
            moveAI(); 
        }
        else
            reinitialize(false);
    }else{ //ai
        let pos = by - aiTop;
        if(pos <= 19 && pos >= -3){
            //console.log('ai hit');
            pos = pos - 8;
            ballVelocity.y += (pos * offset);
        }
        else
            reinitialize(true);
    }
}


function reinitialize(win){
    halt = true;
    scoreTxt.style.top = '33vh';
    if(win){
        scoreTxt.innerHTML = 'YOU WON';
        scoreTxt.style.color = 'rgb(81, 235, 81)';
    }
    else{
        scoreTxt.innerHTML = 'YOU LOST';
        scoreTxt.style.color = 'rgb(255, 70, 70)';
    }
}