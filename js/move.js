//pon aquí tu js

const mario = document.getElementById("mario");
const bicho = document.getElementById("bicho");

var posicionX = 300;
var posicionY = 515;
var velocidadY = 0;
var gravedad = 1;
var saltando = false;

// 👇 Guardamos estado de teclas
var teclas = {
    izquierda: false,
    derecha: false
};

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        teclas.izquierda = true;
        mario.style.transform = "scaleX(-1)";
    }

    if (event.key === "ArrowRight") {
        teclas.derecha = true;
        mario.style.transform = "scaleX(1)";
    }

    if (event.key === "ArrowUp") {
        if (!saltando) {
            velocidadY = -15;
            saltando = true;
        }
    }
});

// 👇 Detectar cuando se suelta la tecla
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        teclas.izquierda = false;
    }

    if (event.key === "ArrowRight") {
        teclas.derecha = false;
    }
});

// 🧠 Función de colisión
function colision(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// 🔄 Función para reiniciar a Mario
function reiniciarMario() {
    posicionX = 300;
    posicionY = 515;
    velocidadY = 0;
    saltando = false;
    mario.style.left = posicionX + "px";
    mario.style.top = posicionY + "px";
}

// Bucle de física
function actualizar() {

    // 👇 Movimiento horizontal continuo
    if (teclas.izquierda) {
        posicionX -= 5;
    }

    if (teclas.derecha) {
        posicionX += 5;
    }

    // LIMITES HORIZONTALES
    if (posicionX < 0) posicionX = 0;
    if (posicionX > 875) posicionX = 875;

    // Gravedad
    velocidadY += gravedad;
    posicionY += velocidadY;

    if (posicionY > 515) {
        posicionY = 515;
        velocidadY = 0;
        saltando = false;
    }

    mario.style.left = posicionX + "px";
    mario.style.top = posicionY + "px";

    // 👇 Detectar colisión con el bicho
    if (bicho && colision(mario, bicho)) {
        reiniciarMario(); // Mario vuelve a su posición inicial
    }

    requestAnimationFrame(actualizar);
}

actualizar();