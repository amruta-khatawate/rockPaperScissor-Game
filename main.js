
let userMove, computerMove;
let p1 = document.querySelector('.js-result');
let p2 = document.querySelector('.js-movePicks');
let p3 = document.querySelector('.js-scores');

const counts = JSON.parse(localStorage.getItem('scores')) || {
      userWins: 0,
      computerWins: 0,
      ties: 0
};


p3.innerHTML=`Your wins:${counts.userWins} | computer wins:${counts.computerWins} | ties:${counts.ties}`;

let rockButton = document.querySelector('.js-rockBtn'),
paperButton = document.querySelector('.js-paperBtn'),
scissorButton = document.querySelector('.js-scissorBtn'),
resetButton = document.querySelector('.js-reset');


rockButton.addEventListener('click', () => {
      userMove='rock';
      ComputerTurn();
      result();
});

paperButton.addEventListener('click', () => {
      userMove='paper';
      ComputerTurn();
      result();
});

scissorButton.addEventListener('click', () => {
      userMove='scissor';
      ComputerTurn();
      result();
});

resetButton.addEventListener('click', () => {
      document.querySelector('.js-confirmation').innerHTML =`
       Are you sure want to reset the scores? <button class= "yes";>Yes</button><button class="no";>No</button> 
      `;
      let yesButton = document.querySelector('.yes'),
          noButton = document.querySelector('.no');
      
          yesButton.addEventListener('click', () => {
            counts.userWins=0;
            counts.computerWins=0;
            counts.ties=0;
            localStorage.removeItem('scores');
            p3.innerHTML=`Your wins:${counts.userWins} | computer wins:${counts.computerWins} | ties:${counts.ties}`;
            document.querySelector('.js-confirmation').innerHTML ='';
          });

          noButton.addEventListener('click', () =>{
            document.querySelector('.js-confirmation').innerHTML ='';
          })

});


document.body.addEventListener('keydown' , (event) => {
     if(event.key === 'r'){
      userMove='rock';
      ComputerTurn();
      result();     
     }else if(event.key === 'p'){
      userMove='paper';
      ComputerTurn();
      result();
     }else if(event.key === 's'){
      userMove='scissor';
      ComputerTurn();
      result();
     }else if(event.key === 'a'){
      isAutoPlay();
     }else if(event.key === 'Backspace'){
      document.querySelector('.js-confirmation').innerHTML =`
       Are you sure want to reset the scores? <button class= "yes";>Yes</button><button class="no";>No</button> 
      `;
      let yesButton = document.querySelector('.yes'),
          noButton = document.querySelector('.no');
      
          yesButton.addEventListener('click', () => {
            counts.userWins=0;
            counts.computerWins=0;
            counts.ties=0;
            localStorage.removeItem('scores');
            p3.innerHTML=`Your wins:${counts.userWins} | computer wins:${counts.computerWins} | ties:${counts.ties}`;
            document.querySelector('.js-confirmation').innerHTML ='';

          });

          noButton.addEventListener('click', () =>{
            document.querySelector('.js-confirmation').innerHTML ='';
          })
     }
      
});
let ComputerTurn = () =>{
      const randonNumber=Math.random();                  
      if(randonNumber >= 0 && randonNumber <= 1/3){
            computerMove = 'rock';
      }else if(randonNumber > 1/3 && randonNumber <= 2/3){
            computerMove = 'paper';
      }else{
            computerMove = 'scissor';
      }
}

let result = () =>{
      if(userMove === computerMove){
            counts.ties++;
            p1.innerHTML = 'Tie'
      }else if(
            (userMove === 'rock' && computerMove === 'scissor') ||
            (userMove === 'paper' && computerMove === 'rock') ||
            (userMove === 'scissor' && computerMove === 'paper')
      ){
            counts.userWins++;
            p1.innerHTML = 'You win';    
      }else{
            counts.computerWins++;
            p1.innerHTML = 'Computer win'
      }
      p2.innerHTML=`You Move= ${userMove} & Computer Move= ${computerMove}`;
      p3.innerHTML=`Your wins:${counts.userWins} | computer wins:${counts.computerWins} | ties:${counts.ties}`;
      localStorage.setItem('scores', JSON.stringify(counts));
}


// //  AUTOMIC PLAY USING setInterval() buit-in function 

let autoButton = document.querySelector('.js-autoPlay');

autoButton.addEventListener('click', (event) => {
            isAutoPlay();
            
});

let isPlaying = false;
let computerIntervalId, userIntervalId, resultIntervalId;


function isAutoPlay(){
      autoButton.innerHTML = 'Stop Playing';
      if(!isPlaying){
            isPlaying = true;
           computerIntervalId =  setInterval(() => {
                  const randonNumber=Math.random();                  
                  if(randonNumber >= 0 && randonNumber <= 1/3){
                        computerMove = 'rock';
                  }else if(randonNumber > 1/3 && randonNumber <= 2/3){
                        computerMove = 'paper';
                  }else{
                        computerMove = 'scissor';
                  }
            },1000);

           userIntervalId =  setInterval(() => {
                  const userNumber=Math.random();                  
                  if(userNumber >= 0 && userNumber <= 1/3){
                        userMove = 'rock';
                  }else if(userNumber > 1/3 && userNumber <= 2/3){
                        userMove = 'paper';
                  }else{
                        userMove = 'scissor';
                  }
            },1000);
      
           resultIntervalId = setInterval(() => {
                  if(userMove === computerMove){
                        counts.ties++;
                        p1.innerHTML = 'Tie'
                  }else if(
                        (userMove === 'rock' && computerMove === 'scissor') ||
                        (userMove === 'paper' && computerMove === 'rock') ||
                        (userMove === 'scissor' && computerMove === 'paper')
                  ){
                        counts.userWins++;
                        p1.innerHTML = 'You win';    
                  }else{
                        counts.computerWins++;
                        p1.innerHTML = 'Computer win'
                  }
                  p2.innerHTML=`You Move= ${userMove} & Computer Move= ${computerMove}`;
                  p3.innerHTML=`Your wins:${counts.userWins} | computer wins:${counts.computerWins} | ties:${counts.ties}`;
                  localStorage.setItem('scores', JSON.stringify(counts));
            },1000);            
      }else{
            isPlaying = false;
            clearInterval(computerIntervalId);
            clearInterval(userIntervalId);
            clearInterval(resultIntervalId);
            autoButton.innerHTML = 'Auto Play';
      }
}




