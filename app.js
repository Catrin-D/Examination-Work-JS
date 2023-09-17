// помидорка

//панельки
const pomodorGif = document.querySelectorAll(".pomodorGif");
const pomodoroCircleTimer = document.querySelector("#pomodoroCircleTimer");

// круглый таймер
const circularProgress = document.querySelector(".circularProgress");
const progressValue = document.querySelector(".progressValue");
const textTimer = document.querySelector(".textTimer");

let progressStartValue = 0;   
let progressEndValue = 100;    
let speedTimer = 0;

// цифровой таймер
const pomodoroTimer = document.querySelector("#pomodoroTimer");
let digitalSec = 0;
let digitalMin = 0;

// цветовые наборы

const mainBackground = ["#98FB98" , "#98FB98" , "#98FB98"];
const panelBackground = ["#FF8C00" , "#ADD8E6" , "#00FF7F"];
const buttonColor = ["#FF4500" , "#00BFFF" , "#2E8B57"];
const radialColor = ["#FF4500" , "#4682B4" , "#32CD32"];
const popupColor = ["#F4A460" , "#1E90FF" , "#9ACD32"];
const popupButtonColor = ["#D2691E" , "#0000CD" , "#6B8E23"];

//настройки стандарт
const settingsData = {
    pomodoroTime : 25,
    pauseTime : 5,
    chillTime : 20,
    roundLenght : 4,
    pomodoroPerDay : 12,
    isSound : true,
};

// кнопки управления таймерами
const allPomodoroButtons = document.querySelectorAll(".pomodoroButtons > button");

const pomodoroButtonStart = document.querySelector("#pomodoroButtonStart");
const pomodoroButtonStop = document.querySelector("#pomodoroButtonStop");
const pomodoroButtonGo = document.querySelector("#pomodoroButtonGo");
const pomodoroButtonFinish = document.querySelector("#pomodoroButtonFinish");

// наименование помидорок = todolist
const pomodoroName = document.querySelector("#pomodoroName");
const pomodoroNameButton = document.querySelector("#pomodoroNameButton");
const pomodoroNameContainer = document.querySelector(".pomodoroNameContainer");

const pomodoroNamesList = [];


// Модальное окно с настройками Помидорки
const openModalButton = document.querySelector(".openModalButton");
const closeModalButton = document.querySelector(".closeModalButton");
const modalWindow = document.querySelector(".modalWindow");
const mainField = document.querySelector(".mainField");
const modalContainer = document.querySelector(".modalContainer");

// Модальное окно с информацией о  Помидорке
const openModalButtonInfo = document.querySelector(".openModalButtonInfo");
const closeModalButtonInfo = document.querySelector(".closeModalButtonInfo");
const modalWindowInfo = document.querySelector(".modalWindowInfo");
const modalContainerInfo = document.querySelector(".modalContainerInfo");

// итоги работы
const resumeInfo = document.querySelector(".resumeInfo");
const resumelist = document.querySelector(".resumelist");
const closeModalButtonResume = document.querySelector(".closeModalButtonResume");
const modalContainerResume = document.querySelector(".modalContainerResume");
const modalWindowResume = document.querySelector(".modalWindowResume");

// настройки
const work = document.querySelector("#work");
const pause = document.querySelector("#pause");
const chill = document.querySelector("#chill");
const round = document.querySelector("#round");
const total = document.querySelector("#total");
const sound = document.querySelector("#sound");

let bgnMain = "";
let bgnAll = "";
let bgnButt = "";

let stopExecution = false; // переключатель для кнопки финиш
let isPaused = false; // флаг паузы
let countPomodoro = 0; // счетчик помидорок
let timerIntervalCircle;
let timerIntervalDigit;


// модальное окно и получение установок
openModalButton.addEventListener("click" , () => {
    modalWindow.classList.remove("closeModalWindow");
    modalWindow.classList.add("openModalWindow");
    modalContainer.style.height="85%";
    modalContainer.style.border="2px solid black";
    modalContainer.style.borderRadius="10px";

    bgnMain = mainField.style.background;
    bgnAll = pomodoroCircleTimer.style.background;
    bgnButt = openModalButton.style.background;

    mainField.style.background = "#808080";
    pomodoroCircleTimer.style.background = "#808080";
    openModalButton.style.background = "#808080";
   
    allPomodoroButtons.forEach (el => {
        el.style.display = "none";  
    });
});

closeModalButton.addEventListener("click" , () => {
    modalWindow.classList.remove("openModalWindow");
    modalWindow.classList.add("closeModalWindow");
    modalContainer.style.height="2%";
    modalContainer.style.border="";
    mainField.style.background = bgnMain;
    pomodoroCircleTimer.style.background = bgnAll;
    openModalButton.style.background = bgnButt;
   
    allPomodoroButtons.forEach (el => {
        el.style.display = "none";
    });

    pomodoroButtonGo.style.display = "inline-block";  

    settingsData.pomodoroTime = work.value*1;
    settingsData.pauseTime = pause.value*1;
    settingsData.chillTime = chill.value*1;
    settingsData.roundLenght = round.value*1;
    settingsData.pomodoroPerDay = total.value*1;
          
    if (sound.checked) {
            settingsData.isSound = true;
        } else {
            settingsData.isSound = false;
    };
});


// модальное окно со справкой
openModalButtonInfo.addEventListener("click" , () => {
    modalWindowInfo.classList.remove("closeModalWindow");
    modalWindowInfo.classList.add("openModalWindow");
    modalContainerInfo.style.height="85%";
    modalContainerInfo.style.border="2px solid black";
    modalContainerInfo.style.borderRadius="10px";

    bgnMain = mainField.style.background;
    bgnAll = pomodoroCircleTimer.style.background;
    bgnButt = openModalButtonInfo.style.background;

    mainField.style.background = "#808080";
    pomodoroCircleTimer.style.background = "#808080";
    openModalButton.style.display = "none";
   
    allPomodoroButtons.forEach (el => {
        el.style.display = "none";  
    });

    pomodoroNameContainer.style.display = "none";
    openModalButtonInfo.style.background = "#808080";
});

closeModalButtonInfo.addEventListener("click" , () => {
    modalWindowInfo.classList.remove("openModalWindow");
    modalWindowInfo.classList.add("closeModalWindow");
    modalContainerInfo.style.height="2%";
    modalContainerInfo.style.border="";
    mainField.style.background = bgnMain;
    pomodoroCircleTimer.style.background = bgnAll;
    openModalButton.style.background = bgnButt;
    openModalButton.style.display = "flex";
   
    allPomodoroButtons.forEach (el => {
        el.style.display = "none";
    });

    pomodoroNameContainer.style.display = "flex";
    openModalButtonInfo.style.background = bgnButt;
    pomodoroButtonGo.style.display = "inline-block";  
});


// меняем тему по текущему интервалу: работа / пауза/ отдых

function changeTheme (period) {
    pomodoroCircleTimer.style.background = mainBackground [period];
    mainField.style.background = panelBackground [period];
    openModalButton.style.background = buttonColor [period];
    openModalButtonInfo.style.background = buttonColor [period];
    pomodoroNameButton.style.background = buttonColor [period];

    allPomodoroButtons.forEach (el => {
        el.style.background = buttonColor [period];
    });

    switch (period) {
        case 0: {
            textTimer.innerText = "Работа";
            pomodorGif.forEach ( el => {
                    el.src = 'assets/tomato.png';
            });
        };
        break;
        case 1: {
            textTimer.innerText = "Пауза";
            pomodorGif.forEach ( el => {
                el.src = 'assets/pause!.png';
            });
        };
        break;
        case 2: {
            textTimer.innerText = "Отдых";
            pomodorGif.forEach ( el => {
                el.src = 'assets/chill-pomidor1.png';
            });
        };
        break;
        default: console.log("Как мы тут оказались?? ");
        break;            
    };

    modalWindow.style.background = popupColor [period];
    closeModalButton.style.background = popupButtonColor [period];  
};


// круговой таймер
async function makeCircleProgressBar (min , period) {
    speedTimer = (min * 60) / 100 * 1000;

    return new Promise((resolve) => {
            timerIntervalCircle = setInterval(() => {

                if (stopExecution) {
                    clearInterval(timerIntervalCircle);
                    resolve();

                   } else if (!isPaused) {
                    (progressStartValue >= progressEndValue) ? progressStartValue : progressStartValue++;

                    progressValue.style.color = `${radialColor[period]}`;            
                    progressValue.innerText = `${progressStartValue}%`;
                    circularProgress.style.background = `conic-gradient(${radialColor[period]} ${progressStartValue * 3.6}deg, #cac8c8 0deg)`

                    if (progressStartValue >= progressEndValue){
                        clearInterval(timerIntervalCircle);
                        resolve();  
                    };   
              }    

            }, speedTimer);
    });
};


// цифровое табло

async function makeDigitalTimer (min) {
    let outputMin = '';
    let outputSec = '';

    return new Promise((resolve) => {

            timerIntervalDigit = setInterval(() => {
                if (stopExecution) {
                    clearInterval(timerIntervalDigit);
                    resolve();

                    } else  if (!isPaused) {
                    digitalSec++;
                        if (digitalSec >= 60) {
                            digitalSec = 0;
                            digitalMin++;
                        };

                        (digitalMin < 10) ? (outputMin = '0' + digitalMin) : (outputMin = digitalMin);
                        (digitalSec < 10) ? (outputSec = '0' + digitalSec) : (outputSec = digitalSec);
                        pomodoroTimer.innerText = `${outputMin} : ${outputSec}` ;

                        if (digitalMin >= min) {
                            clearInterval(timerIntervalDigit);
                            resolve();                        
                        };
                }

            }, 1000);

    });
};


// звоночек 
function getGong () {
    const myAudio = new Audio();
    myAudio.src = 'assets/rington4.mp3'; 
    if (settingsData.isSound) {
        myAudio.play();    
    };
};

// Функция для запуска или перезапуска асинхронных функций
function startExecution() {
    if (stopExecution) {
        timerIntervalCircle = undefined;
        timerIntervalDigit = undefined;
        } else if (isPaused) {
            pomodoroButtonStop.innerText = "Стоп";
    };
        stopExecution = false;
        isPaused = false; 
};  
  
// Функция для остановки или приостановки выполнения
function toggleExecution() {

    if (isPaused) {
        isPaused = false;
        pomodoroButtonStop.innerText = "Стоп";
        startExecution();
    } else {
        isPaused = true;
        pomodoroButtonStop.innerText = "Дальше";
    };
};


// Функция для прерывания выполнения и остановки асинхронных функций
function stopExecutionFunc() {
    stopExecution = true;
    clearInterval(timerIntervalCircle);
    clearInterval(timerIntervalDigit);
};


// сброс параметров таймеров
function clearCounters() {
    progressStartValue = 0;   
    speedTimer = 0;
    digitalSec = 0;
    digitalMin = 0;
};

async function controlFunction () {
    isPaused = false;
    countPomodoro = 0;


  // Добавляем обработчики событий на кнопки
  pomodoroButtonStart.addEventListener('click',()  => {
    clearCounters();
    startExecution();
  }); 

  pomodoroButtonStop.addEventListener('click', () => {
    toggleExecution();
  });


  function finish() {
    modalWindowResume.classList.remove("closeModalWindow");
    modalWindowResume.classList.add("openModalWindow");
    modalContainerResume.style.height="85%";
    modalContainerResume.style.border="2px solid black";
    modalContainerResume.style.borderRadius="10px";
    
    bgnMain = mainField.style.background;
    bgnAll = pomodoroCircleTimer.style.background;
    bgnButt = openModalButtonInfo.style.background;

    mainField.style.background = "#808080";
    pomodoroCircleTimer.style.background = "#808080";
       
    allPomodoroButtons.forEach (el => {
        el.style.display = "none";  
    });
    
    resumeInfo.innerText = `Было выполнено: ${countPomodoro} 
    задач - помидорок, в т.ч.:`

    if (pomodoroNamesList.length == 0) {
        pomodoroNamesList[0] = "Одна очень большая задача!"
    }
    pomodoroNamesList.forEach(el => {
        const newLi = document.createElement("li")
        newLi.innerText = el; 
        resumelist.appendChild(newLi);
    });
    
    closeModalButtonResume.addEventListener("click" , () => {
        modalWindowResume.classList.remove("openModalWindow");
        modalWindowResume.classList.add("closeModalWindow");
        modalContainerResume.style.height="2%";
        modalContainerResume.style.border="";
        mainField.style.background = bgnMain;
        pomodoroCircleTimer.style.background = bgnAll;
        openModalButton.style.background = bgnButt;
       
        allPomodoroButtons.forEach (el => {
            el.style.display = "none";
        });
        pomodoroButtonGo.style.display = "none";  
 
    });
};


pomodoroButtonFinish.addEventListener('click', () => {
        stopExecutionFunc();
        finish();
}); 

pomodoroNameButton.addEventListener('click', () => {
    if (pomodoroName.value === ""){
        pomodoroNamesList[countPomodoro] = (`Помидорка  ${countPomodoro}`);
    } else {
        pomodoroNamesList[countPomodoro] = (pomodoroName.value);
        pomodoroName.value = "";
    };
});

// основной модуль - цикл из нескольких раундов

    do {
        for (let round = 1; round <= settingsData.roundLenght; round++) {
            if (countPomodoro < settingsData.pomodoroPerDay) {
                countPomodoro++;                  
                pomodoroNameButton.disabled = false;

                clearCounters();
                changeTheme (0);
                await Promise.all([makeCircleProgressBar (settingsData.pomodoroTime , 0) , makeDigitalTimer (settingsData.pomodoroTime)]);
                getGong ();

                pomodoroNameButton.disabled = true;
                clearCounters();
                changeTheme (1);
                await Promise.all([makeCircleProgressBar (settingsData.pauseTime , 1) , makeDigitalTimer (settingsData.pauseTime)]);
                getGong ();
            };

        };

        clearCounters();
        changeTheme (2);
        await Promise.all([makeCircleProgressBar (settingsData.chillTime , 2) , makeDigitalTimer (settingsData.chillTime), ]);
        getGong ();        

    } while (countPomodoro < settingsData.pomodoroPerDay);

    finish();
};

// программа

allPomodoroButtons.forEach (el => {
    el.style.display = "none";
});

pomodoroButtonGo.style.display = "inline-block";

    pomodoroButtonGo.addEventListener ("click" , () => {
        allPomodoroButtons.forEach (el => {
            el.style.display = "inline-block";
        });

    pomodoroButtonGo.style.display = "none";

    openModalButton.disabled = true;
    openModalButtonInfo.disabled = true;
    pomodoroNameButton.disabled = false;

    controlFunction();

    });
