const player = document.querySelector('.player');
const sliders = player.querySelectorAll('.player__slider');
const video = player.querySelector('video');
const toggle = player.querySelector('.toggle');
const skip = player.querySelectorAll('.player__button');
const fullBar = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
let mousedown = false;

toggle.addEventListener('click', togglePlay);
document.addEventListener('keydown', togglePlay);
video.addEventListener('dblclick', toggleFullscreen);
video.addEventListener('click', togglePlay);
fullBar.addEventListener('click', jumpToProgress);
fullBar.addEventListener('mousemove', (e) => mousedown && jumpToProgress(e));
fullBar.addEventListener('mousedown', () => mousedown = true);
fullBar.addEventListener('mouseup', () => mousedown = false);

sliders.forEach(slider => {
slider.addEventListener('input', handleControl);});
function handleControl (){
    if (this.name == 'volume'){
        video.volume = this.value;
        this.setAttribute('title', `Volume: ${video.volume *100}%`);
    }else{
        video.playbackRate = this.value;
        this.setAttribute('title', `Play Speed: ${video.playbackRate}x`);
    }
}

function togglePlay(e){
        if (e.type === 'click' || e.code === 'KeyK'){
            if(!video.paused){
                toggle.innerText = String.fromCodePoint(9654);
                toggle.setAttribute('title', 'Play');
                toggle.style.fontSize = '16px';
                video.pause();
            }else{
                toggle.innerText = String.fromCodePoint(0x23F8);
                toggle.setAttribute('title', 'Pause');
                toggle.style.fontSize = '30px';
                video.play();
            }
        }
}

document.addEventListener('keydown', skipVideo);
skip.forEach(button => {
    button.addEventListener('mousedown', skipVideo);});
function skipVideo(e){
    let time;
    if (e.type === 'mousedown'){
        time = +this.dataset['skip'];
    }else if (e.code === 'ArrowLeft'){
        time = -10;
    }else if(e.code === 'ArrowRight'){
        time = 25;    
    }
    if(!isNaN(time)){
        video.currentTime += time;
        vidProgress();
    }
}

function toggleFullscreen() {
    if(document.fullscreenElement){
        document.exitFullscreen();
        return;
    }
        player.requestFullscreen();
}

video.addEventListener('loadedmetadata', function(){
setInterval(vidProgress, 1000);
});

function jumpToProgress(e){
        const newTime = (e.offsetX / fullBar.offsetWidth) * video.duration;
        video.currentTime = newTime;
        vidProgress();
}

function vidProgress(){
    let progress = (video.currentTime / video.duration) *100;
    progressBar.style.flexBasis = `${progress}%`;
}