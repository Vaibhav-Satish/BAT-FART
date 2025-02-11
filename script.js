window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    const bgImg = new Image();
    bgImg.src = "background.png";

    const batImg = new Image();
    batImg.src = "bat.png";

    const bat = {
        x: 100,
        y: canvas.height / 2,
        width: 50,
        height: 40,
        gravity: 0.5,
        lift: -10,
        velocity: 0
    };

    let obstacles = [];
    let farts = [];
    let score = 0;
    let highScore = 0;

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            bat.velocity = bat.lift;
            farts.push({ x: bat.x - 10, y: bat.y + bat.height / 2, alpha: 1 });
        }
    });

    function update() {
        bat.velocity += bat.gravity;
        bat.y += bat.velocity;

        if (bat.y + bat.height > canvas.height) {
            bat.y = canvas.height - bat.height;
            bat.velocity = 0;
        }
        if (bat.y < 0) {
            bat.y = 0;
            bat.velocity = 0;
        }

        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= 5;
            if (
                bat.x < obstacles[i].x + obstacles[i].width &&
                bat.x + bat.width > obstacles[i].x &&
                bat.y < obstacles[i].y + obstacles[i].height &&
                bat.y + bat.height > obstacles[i].y
            ) {
                alert("Game Over! Score: " + score);
                if (score > highScore) highScore = score;
                score = 0;
                obstacles = [];
                bat.y = canvas.height / 2;
                bat.velocity = 0;
            }
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        if (Math.random() < 0.02) {
            let obstacleHeight = Math.random() * (canvas.height - 50);
            obstacles.push({
                x: canvas.width,
                y: canvas.height - obstacleHeight,
                width: 40,
                height: obstacleHeight
            });
        }

        for (let i = 0; i < farts.length; i++) {
            farts[i].x -= 2;
            farts[i].alpha -= 0.02;
            if (farts[i].alpha <= 0) {
                farts.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
        for (let i = 0; i < farts.length; i++) {
            ctx.globalAlpha = farts[i].alpha;
            ctx.beginPath();
            ctx.arc(farts[i].x, farts[i].y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
        ctx.drawImage(batImg, bat.x, bat.y, bat.width, bat.height);
        ctx.fillStyle = "red";
        for (let i = 0; i < obstacles.length; i++) {
            ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        }
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 20, 30);
        ctx.fillText("High Score: " + highScore, 20, 60);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
};
