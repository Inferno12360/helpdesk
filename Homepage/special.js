const button = document.getElementById('movingButton');
const gewonnenText = document.getElementById('gewonnenText');
const trollFace = document.getElementById('trollFace');
const restartButton = document.getElementById('restartButton');
const gameArea = document.getElementById('gameArea');

const maxJumpX = gameArea.clientWidth / 10;
const maxJumpY = gameArea.clientHeight / 10;

let isGameActive = true;

button.addEventListener('mouseover', function() {
    if (!isGameActive) return;

    const currentX = button.offsetLeft;
    const currentY = button.offsetTop;

    let newX = currentX + (Math.random() * maxJumpX * 2 - maxJumpX);
    let newY = currentY + (Math.random() * maxJumpY * 2 - maxJumpY);

    const maxX = gameArea.clientWidth - button.offsetWidth;
    const maxY = gameArea.clientHeight - button.offsetHeight;

    if (newX < 0) newX = 0;
    if (newX > maxX) newX = maxX;
    if (newY < 0) newY = 0;
    if (newY > maxY) newY = maxY;

    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
});

button.addEventListener('click', function() {
    if (!isGameActive) return;

    button.style.display = 'none';
    gewonnenText.style.display = 'block';
    isGameActive = false;

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        gewonnenText.style.display = 'none';
        trollFace.style.display = 'block';
    }, 5000);

    setTimeout(() => {
        trollFace.style.display = 'none';
        rasendeButtons();

        setTimeout(() => {
            removeAllButtons();
            restartButton.style.display = 'block';
        }, 10000);
    }, 10000);
});

function rasendeButtons() {
    for (let i = 0; i < 100; i++) {
        const newButton = document.createElement('button');
        newButton.textContent = 'Fang mich!';
        newButton.classList.add('racingButton');
        gameArea.appendChild(newButton);

        animateButton(newButton);
    }
}

function animateButton(btn) {
    let newX = Math.random() * 100;
    let newY = Math.random() * 100;

    setInterval(() => {
        newX = Math.random() * 100;
        newY = Math.random() * 100;
        btn.style.left = `${newX}vw`;
        btn.style.top = `${newY}vh`;
    }, 500);
}

function removeAllButtons() {
    const buttons = document.querySelectorAll('.racingButton');
    buttons.forEach(button => button.remove());
}

restartButton.addEventListener('click', function() {
    restartButton.style.display = 'none';
    button.style.display = 'block';
    gewonnenText.style.display = 'none';
    isGameActive = true;
});
