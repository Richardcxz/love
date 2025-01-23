var colours = ['#f00', '#f06', '#f0f', '#f6f', '#f39', '#f9c']; // Cores dos corações
var minisize = 10; // Menor tamanho dos corações em pixels
var maxisize = 20; // Maior tamanho dos corações em pixels
var hearts = 100; // Número máximo de corações na tela

var x = 400, y = 300;
var swide = window.innerWidth;
var shigh = window.innerHeight;
var herz = [], herzx = [], herzy = [], herzs = [];

function createHeart() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.fontSize = minisize + "px";
    div.style.color = colours[Math.floor(Math.random() * colours.length)];
    div.style.pointerEvents = "none";
    div.textContent = "❤";
    document.getElementById("hearts-background").appendChild(div);
    return div;
}

function initHearts() {
    for (let i = 0; i < hearts; i++) {
        herz[i] = createHeart();
        herzy[i] = false;
    }
    animateHearts();
}

function animateHearts() {
    for (let i = 0; i < hearts; i++) {
        if (herzy[i] === false) {
            herzx[i] = Math.random() * swide;
            herzy[i] = Math.random() * shigh;
            herzs[i] = Math.random() * (maxisize - minisize) + minisize;
            herz[i].style.fontSize = herzs[i] + "px";
            herz[i].style.left = herzx[i] + "px";
            herz[i].style.top = herzy[i] + "px";
        } else {
            herzy[i] -= herzs[i] / 20;
            if (herzy[i] < 0) herzy[i] = shigh;
            herz[i].style.top = herzy[i] + "px";
        }
    }
    requestAnimationFrame(animateHearts);
}

window.addEventListener("resize", () => {
    swide = window.innerWidth;
    shigh = window.innerHeight;
});

initHearts();

const startDate = new Date('2024-12-23T00:00:00');

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const audio = document.getElementById('audio');
const volumeSlider = document.getElementById('volume-slider');

playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
});

pauseButton.addEventListener('click', () => {
    audio.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
});

volumeSlider.addEventListener('input', (event) => {
    audio.volume = event.target.value;
});
