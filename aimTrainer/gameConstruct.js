const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const targetSizeInput = document.getElementById("target-size");
const speedInput = document.getElementById("speed");

//intialize aimtrainer game
let aimTrainer;

//when player clicks Start button, call AimTrainer Class Game, start game
startButton.addEventListener("click", () => {
  //const speed = speedInput.value || 1;
  const targetSize = targetSizeInput.value || 30;
  aimTrainer = new AimTrainer({ targetSize, delay: 3000 });
  aimTrainer.start();
});

//When player clicks Stop button, stops game/reset
stopButton.addEventListener("click", () => {
    aimTrainer.stop();
});