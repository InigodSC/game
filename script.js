const container = document.getElementById('game-container');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameRunning = false;

startBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.innerText = score;
    gameRunning = true;
    startBtn.style.display = 'none';
    spawnTarget();
});

function spawnTarget() {
    if (!gameRunning) return;

    const target = document.createElement('div');
    target.classList.add('target');
    
    // Posición aleatoria
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    container.appendChild(target);

    // Animación de aparición con Anime.js
    anime({
        targets: target,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack'
    });

    // El objetivo desaparece si no haces clic
    const timeout = setTimeout(() => {
        if (target.parentNode) {
            anime({
                targets: target,
                scale: 0,
                opacity: 0,
                duration: 300,
                easing: 'easeInBack',
                complete: () => {
                    if (target.parentNode) container.removeChild(target);
                }
            });
        }
    }, 1200);

    target.addEventListener('mousedown', () => {
        score++;
        scoreEl.innerText = score;
        clearTimeout(timeout);
        
        // Animación de "explosión" al hacer clic
        anime({
            targets: target,
            scale: 1.5,
            opacity: 0,
            duration: 200,
            easing: 'easeOutExpo',
            complete: () => {
                if (target.parentNode) container.removeChild(target);
            }
        });
    });

    // Crear el siguiente objetivo
    setTimeout(spawnTarget, 800);
}

// Animación del título al cargar la página
anime({
    targets: '.title',
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1500,
    easing: 'easeOutElastic(1, .6)'
});
