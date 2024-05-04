class AimTrainer {
    //Construct initial variables
    constructor({ delay, targetSize }) {
      this.aimTrainerEl = document.getElementById("aim-trainer");
      this.scoreEl = document.getElementById("score");
      this.score = 0;
      this.delay = 2000;
      this.targetSize = targetSize || 30;
    }
  
    //Create new targets based on construct settings 
    createTarget() {
      const target = new Target({targetSize: this.targetSize, aimTrainerEl: this.aimTrainerEl,
        //When hit target, add to the Score Total
        onTargetHit: () => {
          this.setScore(this.score + 1);
        },
      });
      //creates visual target
      target.start();
    }
  
    //Store new Score value, change html display based on stored Score
    setScore(number) {
      this.score = number;
      this.scoreEl.innerHTML = this.score;
    }

  
    
    //Initialize beginning variables, Start Gameplay -> create Target
    start() {
      //reset score
      this.setScore(0);
      this.ctr = 10;
      this.aimTrainerEl.style.position = "relative";

      //checks if Game has already started. If not started yet, will start timer, create targets based on delay
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.createTarget();
        }, this.delay);
      } else {
        return;
      }
  
    }
  
    //If game is running(has timer tracked), stops interval, resets timer
    stop() {
      //clear board
      this.aimTrainerEl.innerHTML = "";
      //reset timer
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        return;
      }
    }
  }