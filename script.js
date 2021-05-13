const imagesArr = ["img/image6.png", "img/image5.png", "img/image4.png", "img/image3.jpg", "img/image2.png", "img/image1.png"];

let curSlideIndex = localStorage.getItem("cur_slide_index") === null ? 1 : parseInt(localStorage.getItem("cur_slide_index"));
let switchInterval;
let isAutoShowOn = false;

initSliderAndDotsSection(imagesArr);
setAnimationStarted(localStorage.getItem("isAnimationStarted") === "true");
showSlide(curSlideIndex);
addEventListener("keydown", handlePress);

function initSliderAndDotsSection(imagesArr) {
    let slider_section = document.getElementById("slider_section");
    slider_section.innerHTML = "";
    let dots_section = document.getElementById("dots");
    for (let i = 0; i < imagesArr.length; i++) {
        slider_section.appendChild(document.createElement("li"));
    }
}

function changeNextSlide(delta) {
    showSlide(curSlideIndex += delta);
}

function changeCurrentSlide(numOfSlide) {
    showSlide(curSlideIndex = numOfSlide);
}

function showSlide(numOfSlide) {
    const slidesArr = document.getElementsByClassName("my_slides");
    const dotsArr = document.getElementsByClassName("dot");

    checkCurrentSlideIndex(numOfSlide, slidesArr);
    changeDisplayStyle(slidesArr, dotsArr);

    slidesArr[curSlideIndex - 1].style.display = "block";
    dotsArr[curSlideIndex - 1].className += " active";
    localStorage.setItem("cur_slide_index", (curSlideIndex).toString());
}

function checkCurrentSlideIndex(numOfSlide, slidesArr) {
    if (numOfSlide > slidesArr.length) {
        curSlideIndex = 1;
    } else {
        if (numOfSlide < 1) {
            curSlideIndex = slidesArr.length;
        }
    }
}

function changeDisplayStyle(slidesArr, dotsArr) {
    for (let i = 0; i < slidesArr.length; i++) {
        slidesArr[i].style.display = "none";
        dotsArr[i].className = dotsArr[i].className.replace("active", "");
    }
}

function changeSlideOption() {
    setAnimationStarted(!isAutoShowOn);
}

function setAnimationStarted(isStart) {
    isAutoShowOn = isStart;
    localStorage.setItem("isAnimationStarted", isAutoShowOn);

    document.getElementById("auto_slide_btn").setAttribute("value",
        isAutoShowOn ? "Stop" : "Start");

    if (isAutoShowOn) {
        switchInterval = setInterval(() => {
            curSlideIndex++;
            changeCurrentSlide(curSlideIndex);
        }, 3000);
    } else {
        clearInterval(switchInterval);
    }
}

function handlePress(e) {
    switch (e.key) {
        case "ArrowLeft":
            changeNextSlide(-1);
            break;
        case "ArrowRight":
            changeNextSlide(1);
            break;
        case "Escape":
            window.close();
            break;
        default:
            break;
    }
}