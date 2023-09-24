let length = 10;
let height =10;
let mines =10;

let isFlag = false;

let handle;
let setFlag;

/*---------*/
const body = document.querySelector('body');
const wrapper= document.createElement('div');
const header = document.createElement('div');

wrapper.className ="wrapper";
body.appendChild(wrapper);

header.className ="header";
header.innerHTML="<h1> Minesweeper game  </h1>"
wrapper.appendChild(header);

const main = document.createElement('div');
main.className ="main";
wrapper.appendChild(main);

const area = document.createElement('div');
area.className ="area";
main.appendChild(area);


const info = document.createElement('div');
info.className ="info";
main.appendChild(info);


/*-------таймер--------*/
const time = document.createElement('div');
time.className ="time";
info.appendChild(time);

const timeText = document.createElement('div');
timeText.className ="timeText";
timeText.innerHTML =`<p> Time:  </p>`;
time.appendChild(timeText);

let timeCount = 0;
let showTime = document.createElement('div');
showTime.className ="showTime";
showTime.innerHTML =`<h1> ${timeCount.toString().padStart(3, '0')}  </h1>`;
time.appendChild(showTime);

let isTimerOn = false;

function timer() {
  return setInterval(function() {
    timeCount++;
    showTime.innerHTML = `<h1> ${timeCount.toString().padStart(3, '0')} </h1>`;
  }, 1000);
}

/*--------Mine Score------------*/
const score= document.createElement('div');
score.className ="score";
info.appendChild(score);

const scoreText= document.createElement('div');
scoreText.className ="scoreText";
scoreText.innerHTML =`<p> Mines:  </p>`;
score.appendChild(scoreText);

let showMines= document.createElement('div');
showMines.className ="showMines";
showMines.innerHTML =`<h1> ${mines.toString().padStart(3, '0')}  </h1>`;
score.appendChild(showMines);

function minesCounter() {
 
}
/*---------Progress--------------------*/
const progress= document.createElement('div');
progress.className ="progress";
info.appendChild(progress);

const progressText= document.createElement('div');
progressText.className ="progressText";
progressText.innerHTML =`<p> Progress:  </p>`;
progress.appendChild(progressText);

let progressCount=0;
const showProgress= document.createElement('div');
showProgress.className ="showProgress";
showProgress.innerHTML =`<h1> ${progressCount.toString().padStart(3, '0')}  </h1>`;
progress.appendChild(showProgress);

/*-----Create Game--------*/
const create = document.createElement('div');
create.className ="create";
create.innerHTML =`<p> Create your game: </p>`;
info.appendChild(create);

/*--------Select----------*/
const select= document.createElement('div');
select.className ="select";
info.appendChild(select);

const selectText= document.createElement('div');
selectText.className ="selectText";
selectText.innerHTML =`<p> size </p>`;
select.appendChild(selectText);


const size= document.createElement('select');
size.className ="size";
size.innerHTML =`
<option>10 x 10</option>
<option>15 x 15</option>
<option>25 x 25</option>`;
select.appendChild(size);

const mineInfo= document.createElement('div');
mineInfo.className ="select";
info.appendChild(mineInfo);

const mineText= document.createElement('div');
mineText.className ="mineText";
mineText.innerHTML =`<p> mines </p>`;
mineInfo.appendChild(mineText);

const mineCreate = document.createElement('div');
mineCreate.innerHTML =`<input class="mineCreate">`;
mineInfo.appendChild(mineCreate);

/*-------sound-----------*/

const sound= document.createElement('div');
sound.className ="sound";
info.appendChild(sound);

const soundText= document.createElement('div');
soundText.className ="soundText";
soundText.innerHTML =`<p> sound </p>`;
sound.appendChild(soundText);

const soundSwitch= document.createElement('div');
soundSwitch.className ="soundSwitch";
soundSwitch.innerHTML = `
<div class="toggle-item item-1">
		<input id="radio1" type="radio" name="radio" value="on" checked>
		<label for="radio1">ON</label>
	</div>
	<div class="toggle-item item-2">
		<input id="radio2" type="radio" name="radio" value="off">
		<label for="radio2">OFF</label>
	</div>
`
sound.appendChild(soundSwitch);

const radioOn = document.getElementById('radio1');
const radioOff = document.getElementById('radio2');
let isSoundOn = true;

radioOn.addEventListener('click', function() {
  isSoundOn = true;
});

radioOff.addEventListener('click', function() {
  isSoundOn = false;
});
/*------Theme--------- */

const theme= document.createElement('div');
theme.className ="theme";
info.appendChild(theme);

const themeText= document.createElement('div');
themeText.className ="themeText";
themeText.innerHTML =`<p> theme </p>`;
theme.appendChild(themeText);

const themeSwitch= document.createElement('div');
themeSwitch.className ="themeSwitch";
themeSwitch.innerHTML = `
<div class="toggle-item item-1">
		<input id="theme1" type="radio" name="theme" value="off" checked>
		<label for="theme1">light</label>
	</div>
	<div class="toggle-item item-2">
		<input id="theme2" type="radio" name="theme" value="on">
		<label for="theme2">dark</label>
	</div>
`
theme.appendChild(themeSwitch);
/*-------button------------*/
const buttonStart= document.createElement('div');  // кнопка  buttonStart
buttonStart.className ="buttonStart";       
buttonStart.innerText = `New game`
info.appendChild(buttonStart);

/*------modal - lose---------------*/

const modalLose = document.createElement('div');
modalLose.className = "modal";
modalLose.innerHTML = `<div class="modal-content-lose">
<h2>Game over!  Try again! </h2>
<button  class="close-modal-lose">Close</button>
</div>`
wrapper.appendChild(modalLose);

/*------modal - win---------------*/
const modalWin = document.createElement('div');
modalWin.className = "modal";
modalWin.innerHTML = `<div class="modal-content-win">
<h2 class="win_information">Hooray! You found all mines in ${timeCount} seconds and ${progressCount} moves! </h2>
<button  class="close-modal-win">Close</button>
</div>`
wrapper.appendChild(modalWin);

/*----------------*/
let timerId;

start(length, height, mines);

function start() {
 
  if(!isTimerOn) {
  timerId = timer();  
    isTimerOn = true;
  }
  
    //console.log(timerId)  

  let progressCount=0;
    const cellsQuantity = length*height;
    area.innerHTML = '<button></button>'.repeat(cellsQuantity);

    if(length==10 && height==10) {
      area.style.gridTemplateColumns = `repeat(${length}, 40px)`;
      area.style.width = `${length*40}px`;
    }  else if(length==15 && height==15) {
      area.style.gridTemplateColumns = `repeat(${length}, 30px)`;
      area.style.width = `${length*30}px`;
      
      info.classList.add('info_middle');

      for(let elem of document.querySelectorAll('button')){
         elem.classList.add('button_middle');
}
    }  else {
      area.style.gridTemplateColumns = `repeat(${length}, 20px)`;
      area.style.width = `${length*20}px`;
      
      info.classList.add('info_small');

      for(let elem of document.querySelectorAll('button')){
         elem.classList.add('button_small');
}
    }
  
    area.style.border = "1px solid rgb(126, 110, 110)";
    const buttons = Array.from(document.querySelectorAll('button'));
    
   let arrIndex = [];
   for(let i = 0; i< cellsQuantity; i++) {
    arrIndex.push(i);
   }

   let arrIndexSorted = arrIndex.sort(()=> Math.random()-0.5);
   
   const arrMines = arrIndexSorted.slice(0, mines);
   

  handle = (event) => {                               //начало функции handle
    if(event.target.tagName !== 'BUTTON') {return}
   
    
   let index =  buttons.indexOf(event.target);
   let button = buttons[index];
   let column = index % length;
   let row = Math.floor(index/length);

   const audio1 = new Audio('mouse_click.mp3');  
   const audio2 = new Audio('muz3.mp3'); 

   if(isSoundOn && !isMine(row, column)) {
    audio1.play();
  }
  if(isSoundOn && isMine(row, column)) {
    audio2.play();
  }

  if(!event.target.classList.contains('visited')) {
    progressCount++;
  }
 
  showProgress.innerHTML =`<h1> ${progressCount.toString().padStart(3, '0')}  </h1>`;


      event.target.classList.add('visited');
   

      if(isMine(row, column)) {
        event.target.innerHTML = '<image src="bomb2.png" alt="bomb" class="image_bomb">';
        clearInterval(timerId);
        isTimerOn = false;

      } else  if(getCount(row, column, button) !==0) {
        event.target.innerHTML = getCount(row, column, button);
      } else if(getCount(row, column, button) ===0) {
        event.target.innerHTML = '';
        for(let i= -1; i<=1; i++){
          for(let j = -1; j<=1; j++) {
            findEmpty(row+j, column+i)
          }
        }
      }

        function findEmpty(row, column) {
      if(row < 0 || column < 0 || row >= height || column >= length) return false;
      const index = row * length + column;
      const button = buttons[index];
    
      if(isMine(row, column)) {
        return;
      }
    
      if(getCount(row, column) === 0 && !button.classList.contains('visited')) {
        button.classList.add('visited');
        for(let i = -1; i <= 1; i++){
          for(let j = -1; j <= 1; j++) {
            if(row+j < 0 || column+i < 0 || row+j >= height || column+i >= length) continue;
            const neighbourIndex = (row + j) * length + (column + i);
            const neighbourButton = buttons[neighbourIndex];
            if(getCount(row + j, column + i) !== 0) {
              neighbourButton.innerHTML = getCount(row + j, column + i);
              neighbourButton.classList.add('visited');
            } else {
              findEmpty(row + j, column + i);
            }
          }}}}
 
    function getCount(row, column) {  //получает количество
      let count = 0;
      for(let i= -1; i<=1; i++){
        for(let j = -1; j<=1; j++) {
          if(isMine(row + j, column + i)) {
            count++;
          }
        } 
      }  const index = row * length + column;
      const button = buttons[index];
      
      if(button &&  count===1) {button.classList.add('one');} 
          if(button &&  count===2) {button.classList.add('two');}   
          if(button &&  count===3) {button.classList.add('three');}  
          if(button &&  count===4) {button.classList.add('four');} 
          if(button &&  count===5) {button.classList.add('five');} 
          if(button &&  count===6) {button.classList.add('six');} 
          if(button &&  count===7) {button.classList.add('seven');} 
          if(button &&  count===8) {button.classList.add('eight');} 
        return count;
     }
     
    let arrNoViseted = buttons.filter(button => !button.classList.contains('visited'));  // определить выигрыш
    let arrFlags =  buttons.filter(button => button.classList.contains('flag'));  
    
     if(arrNoViseted.length -2 === arrMines.length ){       //есть кнопка button closeModal 
    
      const audio3 = new Audio('muz2.mp3'); 
          audio3.play();

          console.log(timerId)
          clearInterval(timerId);
          isTimerOn = false;

          let win_information = document.querySelector('.win_information')
          win_information.innerText=`Hooray! You found all mines in ${timeCount} seconds and ${progressCount} moves!`
        
           modalWin.style.visibility = 'visible';
           modalWin.style.opacity = '1';
         

      }        


       }                                            //заканчивается функция handle

   function isMine(row, column) {
    if(row <0 || column <0 || row >= height ||column >= length) return false;
    let index = row*length + column;
    return arrMines.includes(index) ? true :false;
   }

  setFlag = (event)=> {
    event.preventDefault(); 
    const button = event.target;

    if(event.target.parentNode.classList.contains('flag')) {
      event.target.parentNode.classList.remove('flag');
      event.target.parentNode.innerHTML = '';
      showMines.innerHTML =`<h1> ${(++mines).toString().padStart(3, '0')}  </h1>`;
    } else if(event.target.classList.contains('flag')) {
      event.target.classList.remove('flag');
      event.target.innerHTML = '';
      showMines.innerHTML =`<h1> ${(++mines).toString().padStart(3, '0')}  </h1>`;
    }     else if(!event.target.classList.contains('flag')) { 
      if(event.target.innerText=='' && !event.target.classList.contains('visited')) {
        event.target.innerHTML = '<image src="flag.png" alt="flag" class="image_flag">';
        event.target.classList.add('flag'); 
      showMines.innerHTML =`<h1> ${(--mines).toString().padStart(3, '0')}  </h1>`;
      }
      
    } else {
      button.innerHTML = ''; 
      button.classList.remove('flag'); 
    }
  };

 
    area.addEventListener('contextmenu', setFlag);

   /*--------message Win--------------*/
   let closeModalWin = document.querySelector('.close-modal-win');

   closeModalWin.addEventListener('click', function closeWin() {
    modalWin.style.visibility = 'hidden';
    });

  /*--------message game over--------------*/
  let closeModalLose = document.querySelector('.close-modal-lose');
  closeModalLose.addEventListener('click', function closeLose() {
    modalLose.style.visibility = 'hidden';
    });

  for(let index of arrMines) {
  
   buttons[index].addEventListener('click',  function loseGame() {
    arrMines.forEach(elem =>{
      buttons[elem].classList.add('visited');
      buttons[elem].innerHTML = '<image src="bomb2.png" alt="bomb" class="image_bomb">';

    } )
        
    modalLose.style.visibility = 'visible';
    modalLose.style.opacity = '1';
   } )
 
    }

  area.addEventListener('click', handle);
  
}
/**------new game---------------- */
 buttonStart.addEventListener('click',function newGame(){
  area.removeEventListener('click', handle);
  area.removeEventListener('contextmenu', setFlag);

  progressCount=0;
  showProgress.innerHTML =`<h1> ${progressCount.toString().padStart(3, '0')}  </h1>`;

  if(isTimerOn) {
   // console.log(timerId)
    clearInterval(timerId);
    isTimerOn=false;
  }

  timeCount = 0;
  showTime.innerHTML =`<h1> ${timeCount.toString().padStart(3, '0')}  </h1>`;

  length = +size.value.slice(0,2);
  height = +size.value.slice(5,7);

  let setMine = document.querySelector('.mineCreate');
 
  if(!setMine.value) { setMine.value=10}
   mines = +setMine.value;

   showMines.innerHTML =`<h1> ${mines.toString().padStart(3, '0')}  </h1>`;
 
  start(length, height, mines);
 
});

/*-------------theme------------------ */
const light = document.querySelector('#theme1');
const dark = document.querySelector('#theme2');
const elems = document.querySelectorAll('p');

dark.addEventListener('click', function darkOn() {
  wrapper.classList.add('dark');

  for(let elem of elems) {
    elem.classList.add('yellow');
  }
})

light.addEventListener('click', function lightOn() {
  wrapper.classList.remove('dark');

  for(let elem of elems) {
    elem.classList.remove('yellow');
  }
})









