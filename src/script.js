    const score = JSON.parse(localStorage.getItem("score")) || {
    Win: 0,
    Lose: 0,
    Tie: 0,
    result: "",
    playerMove: "",
    computerMove: "",
  };
    let time ; 
    let play = true ; 
    let reset ;
    let div ;
    let auto;

  document.body.addEventListener('keydown',()=>{
        if(event.key==='a'){
            autoplay(pickComputerMove(),pickComputerMove());
        }
      })  

  document.body.addEventListener('keydown',()=>{
        if(event.key==='Backspace'){
            
            restart();
        }
      })  
  document.querySelector('#js-bt-rock').
    addEventListener('click',()=>{
      playGame('rock');
    })

  
  document.querySelector('#js-bt-paper').
    addEventListener('click',()=>{
      playGame('paper');
    })

    
  document.querySelector('#js-bt-scirssos').
    addEventListener('click',()=>{
      playGame('scirssos');
    })

  document.querySelector('#js-bt-restart').
    addEventListener('click',()=>{
      playGame('Restart');
    })

  document.querySelector('#js-bt-autoplay').
    addEventListener('click',()=>{
      autoplay(pickComputerMove(),pickComputerMove())
    })
  showResult();

  function playGame(playerMove) {

    auto==!true ? div.innerHTML='':null;
    const computerMove = pickComputerMove();
    score.playerMove = playerMove;
    score.computerMove = computerMove;
    if (
      playerMove === "paper" ||
      playerMove === "scirssos" ||
      playerMove === "rock"
    ) {
      playerMove === "paper"
        ? computerMove === "scirssos"
          ? ((score.result = "You Lose"), score.Lose++)
          : computerMove === "rock"
          ? ((score.result = "You Win"), score.Win++)
          : computerMove === "paper"
          ? ((score.result = "Tie"), score.Tie++)
          : null
        : null;

      playerMove === "scirssos"
        ? computerMove === "scirssos"
          ? ((score.result = "Tie"), score.Tie++)
          : computerMove === "rock"
          ? ((score.result = "You Lose"), score.Lose++)
          : computerMove === "paper"
          ? ((score.result = "You Win"), score.Win++)
          : null
        : null;

      playerMove === "rock"
        ? computerMove === "scirssos"
          ? ((score.result = "You Win"), score.Win++)
          : computerMove === "rock"
          ? ((score.result = "Tie"), score.Tie++)
          : computerMove === "paper"
          ? ((score.result = "You Lose"), score.Lose++)
          : null
        : null;

      localStorage.setItem("score", JSON.stringify(score));
    } else {
        restart();
    }

    showResult();
  }

  function restart(){
    
    div = document.querySelector('#js-div-restart');
    div.innerHTML= `<div  class=" alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="23" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
      An example danger alert with an icon
    </div>
    <div class="col"></div>
    <div class="col col-md-3">
      <span id="js-span-restart" class="restart-btn"><button class="btn btn-dark">Yes</button></span>
      <span id="js-span-restart" class="restart-btn"><button class="btn btn-dark">No</button></span> 
    </div>
    
    <div id="js-div-restart">

    </div>

  </div>`
  span = document.querySelectorAll('#js-span-restart');

    span[0].
      addEventListener('click',()=>{
      score.Win = 0;
      score.Lose = 0;
      score.Tie = 0;    
      score.result = "Restart";
      play=false
      autoplay();
      localStorage.setItem("score",JSON.stringify(score));
      div.innerHTML='';
      showResult();
      
        })
    span[1].
        addEventListener('click',()=>{
            div.innerHTML=''
        })
   }


  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = "";

    randomNumber >= 0 && randomNumber <= 1 / 3
      ? (computerMove = "rock")
      : randomNumber >= 1 / 3 && randomNumber <= 2 / 3
      ? (computerMove = "scirssos")
      : randomNumber >= 2 / 3 && randomNumber <= 1
      ? (computerMove = "paper")
      : null;

    return computerMove;
  }

  function showResult() {
    const resultElement = document.querySelector(".js-result");

    styleSelector = {
      createStyleSelector(property, color, backGroundColor) {
        styleSelector[property] = {
          color: color,
          backGroundColor: backGroundColor,
        };
      },
    }; 

    styleSelector.createStyleSelector("You Win", "white", "green");
    styleSelector.createStyleSelector("You Lose", "white", "red");
    styleSelector.createStyleSelector("Tie", "white", "orange");
    styleSelector.createStyleSelector("rock", "#000", "#ffc107");
    styleSelector.createStyleSelector("scirssos", "#fff", "#198754");
    styleSelector.createStyleSelector("paper", "#fff", "#0d6efd");

    if (score.result === "Restart") {
      return resultElement.innerHTML = `
           <p> Win : ${score.Win} Lose : ${score.Lose} Tie : ${score.Tie}   
          </p>`;
    }

    resultElement.innerHTML = `
     
    <span> Your move is <span class="p-1 rounded" style="color:${styleSelector[score.playerMove].color};
      background-color:${styleSelector[score.playerMove].backGroundColor}
      "> ${score.playerMove}</span>
    </span>And Computer move is
    <span class="p-1 rounded" style="color:${styleSelector[score.computerMove].color};
       background-color:${
         styleSelector[score.computerMove].backGroundColor
       };">
        ${score.computerMove} </span></p>
        
    
     <span class="p-1 rounded" style="color:${styleSelector[score.result].color};
     background-color:${styleSelector[score.result].backGroundColor};
      >
        " >${score.result}
        </span>

     <p class="p-3">
        Win : ${score.Win} Lose : ${score.Lose} Tie : ${score.Tie}   
        </p>`;
  }

  function autoplay(playerMove,computerMove)
  { 
    button = document.querySelector('#js-bt-autoplay');

    if(play===false)
    {
    button.classList.remove('btn-danger');
    button.classList.add('btn-light')
    play=true;
    auto=false;
    button.innerText='AutoPlay'
    buttonDisabler(false)
    return clearInterval(time)
    }
    
    buttonDisabler(true)
    time = setInterval(()=>{
        playGame(playerMove,computerMove)
   
    },1000)
    button.innerText='Stop';
    play=false;
    auto=true;
    button.classList.remove('btn-light');
    button.classList.add('btn-danger');
    

}
 function buttonDisabler(value){

  document.querySelector('#js-bt-rock').disabled=value;
  
  document.querySelector('#js-bt-paper').disabled=value;
    
  document.querySelector('#js-bt-scirssos').disabled=value;

} 