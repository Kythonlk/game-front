document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const statusElement = document.getElementById('status');

    const cellSize = 20;
    const canvasWidth = 400;
    const canvasHeight = 400;
    let playerPosition = { x: 1, y: 1 };
    let maze = generateMaze(20, 20);
    let gameInterval;
    let startTime;
    let timerInterval;
    const timeLimit = 30;
    let goalPosition = { x: 0, y: 0 };
    let level = 1;
    let shiftInterval;

    function resizeCanvas() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }
    resizeCanvas();

    function startGame() {
        level = 1;
        playerPosition = { x: 1, y: 1 };
        generateGoalPosition();
        drawMaze(maze);
        drawPlayer();
        startTimer();
        startLevelShift();
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = timeLimit - elapsed;
            if (statusElement) {
                statusElement.textContent = `Time: ${remainingTime} s`;
            }

            if (remainingTime <= 0) {
                stopTimer();
                endGame(false);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        clearInterval(shiftInterval); 
    }

    function startLevelShift() {
        shiftInterval = setInterval(() => {
            if (gameInterval) {
                shiftMaze();
                drawMaze(maze);
                drawPlayer();
            }
        }, 3000); 
    }

    function shiftMaze() {
        maze = generateMaze(20, 20); 
        generateGoalPosition();
        playerPosition = { x: 1, y: 1 }; 
    }

    function endGame(win) {
        if (win) {
            alert('Congratulations! You reached the goal!');
            level += 1; 
            shiftMaze(); 
            startGame(); 
        } else {
            alert('Time\'s up! You did not reach the goal in time.');
        }
    }

    document.getElementById('start-game').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('pause-game').addEventListener('click', () => {
        clearInterval(gameInterval);
        gameInterval = null;
        stopTimer();
    });

    document.getElementById('reset-game').addEventListener('click', () => {
        clearInterval(gameInterval);
        gameInterval = null;
        stopTimer();
        maze = generateMaze(20, 20);
        playerPosition = { x: 1, y: 1 };
        generateGoalPosition();
        drawMaze(maze);
        drawPlayer();
    });

    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event) {
        const { x, y } = playerPosition;
        switch (event.key) {
            case 'ArrowUp':
                if (y > 0 && maze[y - 1][x] === 0) playerPosition.y -= 1;
                break;
            case 'ArrowDown':
                if (y < maze.length - 1 && maze[y + 1][x] === 0) playerPosition.y += 1;
                break;
            case 'ArrowLeft':
                if (x > 0 && maze[y][x - 1] === 0) playerPosition.x -= 1;
                break;
            case 'ArrowRight':
                if (x < maze[0].length - 1 && maze[y][x + 1] === 0) playerPosition.x += 1;
                break;
        }
        drawMaze(maze);
        drawPlayer();
    }

    function generateMaze(width, height) {
        const maze = Array.from({ length: height }, () => Array(width).fill(1));

        function visit(x, y) {
            maze[y][x] = 0;
            const directions = [
                [0, 1], [1, 0], [0, -1], [-1, 0]
            ].sort(() => Math.random() - 0.5);

            for (const [dx, dy] of directions) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;

                if (nx >= 0 && ny >= 0 && nx < width && ny < height && maze[ny][nx] === 1) {
                    maze[y + dy][x + dx] = 0;
                    visit(nx, ny);
                }
            }
        }

        visit(1, 1);
        return maze;
    }

    function generateGoalPosition() {
        let goalPlaced = false;
        while (!goalPlaced) {
            const x = Math.floor(Math.random() * maze[0].length);
            const y = Math.floor(Math.random() * maze.length);
            if (maze[y][x] === 0 && (x !== playerPosition.x || y !== playerPosition.y)) {
                goalPosition = { x, y };
                goalPlaced = true;
            }
        }
    }

    function drawMaze(maze) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                ctx.fillStyle = maze[y][x] === 1 ? '#000' : '#fff';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }

        ctx.beginPath();
        ctx.arc(goalPosition.x * cellSize + cellSize / 2, goalPosition.y * cellSize + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(playerPosition.x * cellSize + cellSize / 2, playerPosition.y * cellSize + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
            endGame(true);
        }
    }

    drawMaze(maze);
    drawPlayer();
});
