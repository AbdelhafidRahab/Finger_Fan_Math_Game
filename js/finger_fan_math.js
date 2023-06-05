let playButton = document.querySelector("section.home .play");
let quitButton = document.querySelector("section.game .quit");
let fingersContainer = document.querySelector("section.game .fingers-container");
let resultsContainer = document.querySelector("section.game .results-container");
let timer = document.querySelector("section.game .timer span");
let currentlyScore = document.querySelector("section.game .scores .currently-score span");
let bestScoreSpan = document.querySelector("section.game .scores .best-score span");
let theResult;
let bestScore = 0;
playButton.onclick = ()=> {
    document.body.style.transform = "translateX(-100%)";
    document.getElementById("on-play").play();
    document.getElementById("on-play").volume = 0.01;
    bestScoreSpan.innerHTML = bestScore;

    let FingerElement1 = Math.floor(Math.random() * 6);
    let FingerElement2 = Math.floor(Math.random() * 6);
    theResult = FingerElement1 + FingerElement2;
    fingersContainer.append(createFingersElement(FingerElement1));
    fingersContainer.append(createadditionOperation());
    fingersContainer.append(createFingersElement(FingerElement2));

    let resultElementRandomPosition = Math.floor(Math.random() * 3); //the result is not always at the same place
    let i = 0; // i : is the nember of element in result container
    while(i < 3) {
        let randomResultNumber = Math.floor(Math.random() * 11);
        let flagAddNewResult = true;

        Array.from(resultsContainer.children).forEach((e)=>{
            if (Number(e.innerHTML) == randomResultNumber) {
                flagAddNewResult = false;
            }
        });
        if (flagAddNewResult) {
            if (i == resultElementRandomPosition) {
                resultsContainer.append(createResultElement(theResult));
                i++;
            }else {
                resultsContainer.append(createResultElement(randomResultNumber));
                i++;
            }
        }
    }

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    let endGameBox = document.createElement("div"); 
    endGameBox.classList.add("end-game-box");
    let messageEndGame = document.createElement("p");
    endGameBox.append(messageEndGame);
    let scoreEndGameBox = document.createElement("div");
    endGameBox.append(scoreEndGameBox);

    let interval = setInterval(()=>{
        timer.innerHTML--;
        if (timer.innerHTML <= 0) {
            clearInterval(interval);

            Array.from(fingersContainer.children).forEach((ele)=>{
                ele.remove();
            });
            Array.from(resultsContainer.children).forEach((ele)=>{
                ele.remove();
            });
            
            document.getElementById("on-play").pause();
            document.getElementById("time-out").play();

            document.body.append(overlay);
            messageEndGame.innerHTML = "Time is out ! " + "<span>Good luck next time</span>";
            scoreEndGameBox.innerText = currentlyScore.innerHTML;
            document.body.append(endGameBox);

            setTimeout(() => {
                location.reload();
            }, 5000);
        }
        
        Array.from(resultsContainer.children).forEach((resultElement)=>{
            resultElement.onclick = ()=> {
                if (Number(resultElement.innerHTML) == theResult) {

                    resultElement.style.backgroundColor = "var(--color-4)";
                    resultElement.style.borderColor = "var(--color-4)";
                    resultElement.style.color = "var(--color-1)";
                    
                    document.getElementById("correct-answer").play();

                    if (Number(currentlyScore.innerHTML) < 200) {
                        timer.innerHTML = Number(timer.innerHTML) + 5;
                        currentlyScore.innerHTML = Number(currentlyScore.innerHTML)+10;
                    }else if(Number(currentlyScore.innerHTML) >= 200 || Number(currentlyScore.innerHTML) < 500){
                        timer.innerHTML = Number(timer.innerHTML) + 2;
                        currentlyScore.innerHTML = Number(currentlyScore.innerHTML)+10;

                        if (currentlyScore.innerHTML >= 500) {
                            clearInterval(interval);
                            
                            Array.from(fingersContainer.children).forEach((ele)=>{
                                ele.remove();
                            });
                            Array.from(resultsContainer.children).forEach((ele)=>{
                                ele.remove();
                            });
                            
                            document.getElementById("on-play").pause();
                            document.getElementById("winning").play();

                            let confettiElement = document.createElement("canvas");
                            confettiElement.id = "my-canvas";
                            document.querySelector("section.game").append(confettiElement);
                            var confettiSettings = {target: confettiElement,
                                                    max : 800,
                                                    size : 1.5,
                                                    props : ['circle', 'square', 'triangle', 'line'],
                                                    rotate : true
                                                    };
                            var confetti = new ConfettiGenerator(confettiSettings);
                            confetti.render();

                            document.body.append(overlay);
                            messageEndGame.innerHTML = "Excellent ! " + "<span>You did a great job</span>";
                            scoreEndGameBox.innerHTML = '<i class="fa-solid fa-trophy"></i>';
                            document.body.append(endGameBox);
                            
                            bestScore = Number(currentlyScore.innerHTML);
                            bestScoreSpan.innerHTML = bestScore;
                            
                            setTimeout(() => {
                                location.reload();
                            }, 10000);
                        }
                    }

                    if (bestScore < Number(currentlyScore.innerHTML)) {
                        bestScore = Number(currentlyScore.innerHTML);
                        bestScoreSpan.innerHTML = bestScore;
                    }
                    if (Number(currentlyScore.innerHTML) > 0) {
                        currentlyScore.style.color = "var(--color-4)";
                    }

                    setTimeout(() => {
                        Array.from(fingersContainer.children).forEach((ele)=>{
                            ele.remove();
                        });
                        Array.from(resultsContainer.children).forEach((ele)=>{
                            ele.remove();
                        });
        
                        if (Number(currentlyScore.innerHTML) < 200) { 
                            // results from 0 to 10
                            
                            let FingerElement1 = Math.floor(Math.random() * 6);
                            let FingerElement2 = Math.floor(Math.random() * 6);
                            theResult = FingerElement1 + FingerElement2;
                            fingersContainer.append(createFingersElement(FingerElement1));
                            fingersContainer.append(createadditionOperation());
                            fingersContainer.append(createFingersElement(FingerElement2));
        
                            let resultElementRandomPosition = Math.floor(Math.random() * 3);
                            let i = 0;
                            while(i < 3) {
                                let randomResultNumber = Math.floor(Math.random() * 11);
                                let flagAddNewResult = true;
        
                                Array.from(resultsContainer.children).forEach((e)=>{
                                    if (Number(e.innerHTML) == randomResultNumber) {
                                        flagAddNewResult = false;
                                    }
                                });
                                if (flagAddNewResult) {
                                    if (i == resultElementRandomPosition) {
                                        resultsContainer.append(createResultElement(theResult));
                                        i++;
                                    }else {
                                        resultsContainer.append(createResultElement(randomResultNumber));
                                        i++;
                                    }
                                }
                            }
        
                        }else if(Number(currentlyScore.innerHTML) >= 200 || Number(currentlyScore.innerHTML) < 500) { 
                            // result from 0 to 20

                            let FingerElement1 = Math.floor(Math.random() * 6);
                            let FingerElement2 = Math.floor(Math.random() * 6);
                            let FingerElement3 = Math.floor(Math.random() * 6);
                            let FingerElement4 = Math.floor(Math.random() * 6);
                            theResult = FingerElement1 + FingerElement2 + FingerElement3 + FingerElement4;
                            fingersContainer.append(createFingersElement(FingerElement1));
                            fingersContainer.append(createFingersElement(FingerElement2));
                            fingersContainer.append(createadditionOperation());
                            fingersContainer.append(createFingersElement(FingerElement3));
                            fingersContainer.append(createFingersElement(FingerElement4));
        
                            let resultElementRandomPosition = Math.floor(Math.random() * 3);
                            let i = 0;
                            while(i < 3) {
                                let randomResultNumber = Math.floor(Math.random() * 21);
                                let flagAddNewResult = true;
        
                                Array.from(resultsContainer.children).forEach((e)=>{
                                    if (Number(e.innerHTML) == randomResultNumber) {
                                        flagAddNewResult = false;
                                    }
                                });
                                if (flagAddNewResult) {
                                    if (i == resultElementRandomPosition) {
                                        resultsContainer.append(createResultElement(theResult));
                                        i++;
                                    }else {
                                        resultsContainer.append(createResultElement(randomResultNumber));
                                        i++;
                                    }
                                }
                            }

                        }
                    }, 700);
                }else {
                    resultElement.style.backgroundColor = "#ED5E68";
                    resultElement.style.borderColor = "#ED5E68";
                    resultElement.style.color = "var(--color-1)";
        
                    document.getElementById("wrong-answer").play();

                    Array.from(resultsContainer.children).forEach((ele)=>{
                        if (ele.innerHTML == theResult) {
                            let flagBorderChangeColor = 0;
                            setInterval(() => {
                                if (flagBorderChangeColor == 0) {
                                    ele.style.backgroundColor = "var(--color-4)";
                                    ele.style.borderColor = "var(--color-4)";
                                    ele.style.color = "var(--color-1)";
        
                                    flagBorderChangeColor = 1;
                                }else {
                                    ele.style.backgroundColor = "var(--color-1)";
                                    ele.style.borderColor = "var(--color-3)";
                                    ele.style.color = "var(--color-3)";
        
                                    flagBorderChangeColor = 0;
                                }
                            }, 250);
                        }
                    });

                    if (Number(currentlyScore.innerHTML) < 200) {
                        timer.innerHTML = Number(timer.innerHTML) - 5;
                        currentlyScore.innerHTML = Number(currentlyScore.innerHTML)-5;
                    }else if(Number(currentlyScore.innerHTML) >= 200 || Number(currentlyScore.innerHTML) < 500){
                        timer.innerHTML = Number(timer.innerHTML) - 10;
                        currentlyScore.innerHTML = Number(currentlyScore.innerHTML)-10;
                    }

                    if (Number(currentlyScore.innerHTML) < 0) {
                        currentlyScore.style.color = "#ED5E68";
                    }

                    setTimeout(() => {
                        Array.from(fingersContainer.children).forEach((ele)=>{
                            ele.remove();
                        });
                        Array.from(resultsContainer.children).forEach((ele)=>{
                            ele.remove();
                        });
        
                        if (Number(currentlyScore.innerHTML) < 200) { 
                            // results from 0 to 10
                            
                            let FingerElement1 = Math.floor(Math.random() * 6);
                            let FingerElement2 = Math.floor(Math.random() * 6);
                            theResult = FingerElement1 + FingerElement2;
                            fingersContainer.append(createFingersElement(FingerElement1));
                            fingersContainer.append(createadditionOperation());
                            fingersContainer.append(createFingersElement(FingerElement2));
        
                            let resultElementRandomPosition = Math.floor(Math.random() * 3);
                            let i = 0;
                            while(i < 3) {
                                let randomResultNumber = Math.floor(Math.random() * 11);
                                let flagAddNewResult = true;
        
                                Array.from(resultsContainer.children).forEach((e)=>{
                                    if (Number(e.innerHTML) == randomResultNumber) {
                                        flagAddNewResult = false;
                                    }
                                });
                                if (flagAddNewResult) {
                                    if (i == resultElementRandomPosition) {
                                        resultsContainer.append(createResultElement(theResult));
                                        i++;
                                    }else {
                                        resultsContainer.append(createResultElement(randomResultNumber));
                                        i++;
                                    }
                                }
                            }
        
                        }else if(Number(currentlyScore.innerHTML) >= 200 || Number(currentlyScore.innerHTML) < 500) { 
                            // result from 0 to 20
                            let FingerElement1 = Math.floor(Math.random() * 6);
                            let FingerElement2 = Math.floor(Math.random() * 6);
                            let FingerElement3 = Math.floor(Math.random() * 6);
                            let FingerElement4 = Math.floor(Math.random() * 6);
                            theResult = FingerElement1 + FingerElement2 + FingerElement3 + FingerElement4;
                            fingersContainer.append(createFingersElement(FingerElement1));
                            fingersContainer.append(createFingersElement(FingerElement2));
                            fingersContainer.append(createadditionOperation());
                            fingersContainer.append(createFingersElement(FingerElement3));
                            fingersContainer.append(createFingersElement(FingerElement4));
        
                            let resultElementRandomPosition = Math.floor(Math.random() * 3);
                            let i = 0;
                            while(i < 3) {
                                let randomResultNumber = Math.floor(Math.random() * 21);
                                let flagAddNewResult = true;
        
                                Array.from(resultsContainer.children).forEach((e)=>{
                                    if (Number(e.innerHTML) == randomResultNumber) {
                                        flagAddNewResult = false;
                                    }
                                });
                                if (flagAddNewResult) {
                                    if (i == resultElementRandomPosition) {
                                        resultsContainer.append(createResultElement(theResult));
                                        i++;
                                    }else {
                                        resultsContainer.append(createResultElement(randomResultNumber));
                                        i++;
                                    }
                                }
                            }
                        }
                    }, 1000);


                }
            }
        });
    },1000);
};


quitButton.onclick = ()=> {
    location.reload();
}

function createFingersElement(param) {
    let elem = document.createElement("img");
    switch (param) {
        case 0:{
            elem.src = "img/zero-fingers.png";
            elem.classList.add("0");
        }break;
        case 1:{
            elem.src = "img/one-finger.png";
            elem.classList.add("1");
        }break;
        case 2:{
            elem.src = "img/two-fingers.png";
            elem.classList.add("2");
        }break;
        case 3:{
            elem.src = "img/three-fingers.png";
            elem.classList.add("3");
        }break;
        case 4:{
            elem.src = "img/four-fingers.png";
            elem.classList.add("4");
        }break;
        case 5:{
            elem.src = "img/five-fingers.png";
            elem.classList.add("5");
        }break;
        default:
            break;
    }
    return elem;
}

function createadditionOperation() {
    let elem = document.createElement("div");
    elem.classList.add("addition-operation");
    elem.innerText = "+";
    return elem;
}

function createResultElement(param) {
    let elem = document.createElement("div");
    elem.classList.add("result-element");
    elem.innerText = param;
    return elem;
}



