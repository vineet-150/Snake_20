const board= document.querySelector('.board');
const startButton= document.querySelector(".btn-start");
const modal=document.querySelector(".modal");
const startGameModal=document.querySelector(".start-game");
const gameOverModal=document.querySelector(".game-over");
const restartButton=document.querySelector(".btn-restart");

const hightScoreElemnt=document.querySelector("#High_Score");
const scoreElement =document.querySelector("#score");
const timeElement= document.querySelector("#time");



const blockHeigth=20;
const blockWidth=20;

// let highScore=0;
let highScore=localStorage.getItem("highScore")||0;

let score=0;
let time=`00:00`;

hightScoreElemnt.innerText=highScore;
const cols=Math.floor(board.clientWidth/blockWidth);

const rows=Math.floor(board.clientHeight/blockHeigth);

const blocks=[];
let snake=[
    {x:1,y:3},
   
]
let direction='down';

let setInterval_Id=null;
let timerIntervalId=null;


let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}







for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
         const block=document.createElement('div');
         block.setAttribute('class','block');
       
         board.appendChild(block);
         blocks[`${row}-${col}`]=block

    }
};

function render(){

   let head=null;
   blocks[`${food.x}-${food.y}`].classList.add("food");

    if(direction==='left'){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction==="right"){
        head={x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction==="down"){
        head={x:snake[0].x+1,y:snake[0].y}
    }
    else if(direction==="up"){
        head={x:snake[0].x-1,y:snake[0].y}

    }

    if(head.x<0||head.x>=rows||head.y<0|| head.y>=cols){
        // alert("Game Over");
        clearInterval(setInterval_Id);
        modal.style.display="flex";
        startGameModal.style.display="none";
        gameOverModal.style.display="flex";
        return;



        

    }


    // food consume logic
    if(head.x==food.x && head.y==food.y){
         blocks[`${food.x}-${food.y}`].classList.remove("food");
         food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
          blocks[`${food.x}-${food.y}`].classList.add("food");
          snake.unshift(head);
          score+=10;
          scoreElement.innerText=score;

          if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore",highScore);
            // local storage ma data string format ma rakh sakta ha
          }

    }


    snake.forEach(segment=>{

        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")

    })
    snake.unshift(head);
    snake.pop();

    snake.forEach(segment=>{

        blocks[`${segment.x}-${segment.y}`].classList.add("fill")

    })


    

}

// render();
function startTimer(){
    timerIntervalId = setInterval(()=>{
        let [min,sec]=time.split(":").map(Number);

        if(sec==59){
            min++;
            sec=0;
        }else{
            sec++;
        }

        time=`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
        timeElement.innerText=time;
    },1000);
}

startButton.addEventListener("click",()=>{

    modal.style.display="none"
    setInterval_Id=setInterval(()=>{
   
    render()
},300);
    startTimer();

  
})


restartButton.addEventListener("click",restartGame)

function restartGame(){

    clearInterval(setInterval_Id);
clearInterval(timerIntervalId);

    blocks[`${food.x}-${food.y}`].classList.remove("food")

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })
    
    score=0;
    time=`00:00`;
   


    scoreElement.innerText=score;

    timeElement.innerText=time;
    startTimer();
    hightScoreElemnt.innerText=highScore;
    modal.style.display="none";
    direction="down";
    snake=[{x:1,y:3}];
    food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
     setInterval_Id=setInterval(()=>{
   
    render()
   },300)
}

addEventListener("keydown",(e)=>{
    if(e.key==="ArrowRight"){
        direction="right";

    }
    else if(e.key==="ArrowLeft"){
        direction="left";

    }
    else if(e.key==="ArrowDown"){
        direction="down";
    }
    else if(e.key==="ArrowUp"){
        direction="up";
    }
})



