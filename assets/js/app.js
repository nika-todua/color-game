let boxes = document.querySelectorAll('.main_box_cont .boxs');
let level = document.querySelector('.header_info_box select');
let chosenLevel = document.querySelector('.level_lv');
let score = document.querySelector('.header_info_box_score-p');
let start = document.querySelector('.header_info_box_start_btn');
let mainColor = document.querySelector('.main_color_code');
let countStart = 0
let userScore = 0

function getRandomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

// ! ლეველების არჩვა
level.addEventListener('change', function () {
    if (level.value == 0) {
        userScore = 0
        mainColor.innerHTML = null
        chosenLevel.innerHTML = "?";
    } else if (level.value == 1) {
        userScore = 0
        countStart = 0
        mainColor.innerHTML = null
        chosenLevel.innerHTML = "Easy";
    } else if (level.value == 2) {
        userScore = 0
        countStart = 0
        mainColor.innerHTML = null
        chosenLevel.innerHTML = "Normal";
    } else if (level.value == 3) {
        userScore = 0
        countStart = 0
        mainColor.innerHTML = null
        chosenLevel.innerHTML = "Hard";
    }
    for (let i = 0; i < 9; i++) {
        boxes[i].style.backgroundColor = 'rgba(132, 132, 139, 0)';
        boxes[i].style.display = "none";
    }
    score.innerHTML = `score ${userScore}`
});
// ! თამაშის დასაწყისი ფუნქცია
start.addEventListener('click', function () {
    countStart++

    if (level.value == 0) {
        let alerts = document.querySelector(".alerts"),
            warninalert = document.querySelector(".alerts_warning_box");

        alerts.classList.add("active-warning")
        warninalert.innerHTML = `<div class="alerts_warning_box_icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg></div>
                                <h2 class="alert_title">Wrong!</h2>
                                <p class="alert_txt">choose a level</p>
                                <button class="alerts_warning_box_btn">OK</button>`

        document.querySelector(".alerts_warning_box_btn").addEventListener('click', () => {
            alerts.classList.remove("active-warning")
        })

        level.classList.add('anim');
    } 
    
    if (countStart == 1) {
        if (level.value == 1 || level.value == 2 || level.value == 3) {
            startGameEvent()
        }
    }
});

function startGameEvent() {

    if (level.classList.contains('anim')) {
        level.classList.remove('anim');
    }
    
    if (level.value == 1) {
        level.style.border = '2px solid black';
        for (let i = 0; i < 3; i++) {
            boxes[i].style.backgroundColor = getRandomColor();
            boxes[i].style.display = "block"
            boxes[i].style.visibility = "visible"
        }
        let randFromThree = Math.round(Math.random() * 2);
        mainColor.innerHTML = boxes[randFromThree].style.backgroundColor;
    } else if (level.value == 2) {
        for (let i = 0; i < 6; i++) {
            boxes[i].style.backgroundColor = getRandomColor()
            boxes[i].style.display = "block"
            boxes[i].style.visibility = "visible"
        }
        let randFromSix = Math.round(Math.random() * 5);
        mainColor.innerHTML = boxes[randFromSix].style.backgroundColor;
    } else if (level.value == 3) {
        for (let i = 0; i < 9; i++) {
            boxes[i].style.backgroundColor = getRandomColor()
            boxes[i].style.display = "block"
            boxes[i].style.visibility = "visible"
        }
        let randFromNine = Math.round(Math.random() * 8);
        mainColor.innerHTML = boxes[randFromNine].style.backgroundColor;
    }

}
// ! ქულის დაკლება ან მომატება
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {

        if (boxes[i].style.backgroundColor == mainColor.textContent) {
            let alertSuccess = document.querySelector(".alerts_Success_box"),
                alerts = document.querySelector(".alerts");

            alerts.classList.add("active-Success")

            userScore++
            score.innerHTML = `score ${userScore}`

            countStart = 0

            for (let j = 0; j < 9; j++) {
                boxes[j].style.display = "none";
            }

            mainColor.innerHTML = `You Passed by ${userScore} score`

            alertSuccess.innerHTML = `<div class="alerts_Success_box_icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
                                      <h2 class="alert_title">Success!</h2>
                                      <p class="alert_txt">You Passed by ${userScore} score</p>
                                      <button class="alerts_Success_box_btn">OK</button>`;


            document.querySelector(".alerts_Success_box_btn").addEventListener('click', () => {
                alerts.classList.remove("active-Success")
            })

        } else {
            let alerts = document.querySelector(".alerts"),
                alertsDont = document.querySelector(".alerts_dont_box");

            userScore--
            score.innerHTML = `score ${userScore}`
            boxes[i].style.visibility = "hidden"

            if (userScore <= 0) {
                score.innerHTML = `score 0`
            }

            alertsDont.innerHTML = `<div class="alerts_dont_box_icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></div>
                                    <h2 class="alert_title">Wrong!</h2>
                                    <p class="alert_txt">Do you want to continue</p>
                                    <button class="alerts_dont_box_btn">OK</button>`;

            alerts.classList.add("active-dont")

            document.querySelector(".alerts_dont_box_btn").addEventListener('click', () => {
                alerts.classList.remove("active-dont")
            })

            if (level.value !== 0) {
                mainColor.innerHTML = null
                level.value = 0
                chosenLevel.innerHTML = "?";
                userScore = 0
                score.innerHTML = `score 0`

                for (let i = 0; i < 9; i++) {
                    boxes[i].style.backgroundColor = 'rgba(132, 132, 139, 0)';
                    boxes[i].style.display = "none";
                }
            }

        }
    })
}