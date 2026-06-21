// ============================
// Get Elements
// ============================

const playBtn = document.getElementById("playBtn");
const difficultyBox = document.getElementById("difficultyBox");
const difficulty = document.getElementById("difficulty");
const playerName = document.getElementById("playerName");
const modes = document.querySelectorAll("input[name='mode']");

// ============================
// Show/Hide Difficulty
// ============================

modes.forEach(mode => {

    mode.addEventListener("change", () => {

        if (mode.value === "ai" && mode.checked) {

            difficultyBox.style.display = "block";

        } else {

            difficultyBox.style.display = "none";

        }

    });

});

// Hide difficulty initially
difficultyBox.style.display = "none";

// ============================
// Start Game
// ============================

playBtn.addEventListener("click", () => {

    let name = playerName.value.trim();

    if (name === "") {
        name = "Player";
    }

    let selectedMode = "pvp";

    modes.forEach(mode => {

        if (mode.checked) {
            selectedMode = mode.value;
        }

    });

    // Save Settings
    localStorage.setItem("playerName", name);
    localStorage.setItem("gameMode", selectedMode);
    localStorage.setItem("difficulty", difficulty.value);

    // Initialize Score
    if (!localStorage.getItem("scoreX")) {

        localStorage.setItem("scoreX", 0);
        localStorage.setItem("scoreO", 0);
        localStorage.setItem("draw", 0);

    }

    // Go to Game Page
    window.location.href = "game.html";

});