window.onload = function () {
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

    let obstacles = [];
    let score = 0;
    let highScore = 0;

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

        // Move obstacles
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= 5; // Speed of obstacles

            // Check for collision
            if (
                bat.x < obstacles[i].x + obstacles[i].width &&
                bat.x + bat.width > obstacles[i].x &&
                bat.y < obstacles[i].y + obstacles[i].height &&
                bat.y + bat.height > obstacles[i].y
            ) {
                // Game over
                alert("Game Over! Score: " + score);
                if (score > highScore) highScore = score;
                score = 0;
                obstacles = [];
                bat.y = canvas.height / 2;
                bat.velocity = 0;
            }

            // Increase score when an obstacle is passed
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        // Spawn new obstacles
        if (Math.random() < 0.02) {
            let obstacleHeight = Math.random() * (canvas.height - 50);
            obstacles.push({
                x: canvas.width,
                y: canvas.height - obstacleHeight,
                width: 40,
                height: obstacleHeight
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bat
        ctx.fillStyle = "purple";
        ctx.fillRect(bat.x, bat.y, bat.width, bat.height);

        // Draw obstacles
        ctx.fillStyle = "red";
        for (let i = 0; i < obstacles.length; i++) {
            ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        }

        // Draw score
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
