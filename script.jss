const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const bat = {
    x: 100,
    y: canvas.height / 2,
    width: 50,
    height: 40,
    gravity: 0.5,
    lift: -10,
    velocity: 0
};

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        bat.velocity = bat.lift;
    }
});

function update() {
    // Apply gravity
    bat.velocity += bat.gravity;
    bat.y += bat.velocity;

    // Prevent bat from falling off the screen
    if (bat.y + bat.height > canvas.height) {
        bat.y = canvas.height - bat.height;
        bat.velocity = 0;
    }
    if (bat.y < 0) {
        bat.y = 0;
        bat.velocity = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     ctx.fillStyle = "purple";
    ctx.fillRect(bat.x, bat.y, bat.width, bat.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
