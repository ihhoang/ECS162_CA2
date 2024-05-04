class Target {
    //Construct initialize targets
    constructor({ targetSize, onTargetHit, aimTrainerEl }) {
      //this.delay = delay || 3000;
      this.targetSize = targetSize || 30;
      this.onTargetHit = onTargetHit;
      this.aimTrainerEl = aimTrainerEl;
    }
  
    //Create Target/logic
    start() {
        //Visuals for Target
        const target = document.createElement("div");
        target.style.position = "absolute";
        target.style.border = `${this.targetSize/3}px solid black`;
        target.style.transition = `all ${(5000 * 2) / 1000}s`;
        target.classList.add("target");
  
        target.style.width = `${this.targetSize}px`;
        target.style.height = `${this.targetSize}px`;

        //generate random coordinates for target
        let y = Math.floor(this.aimTrainerEl.clientHeight * 0.9 * Math.random());
        let x = Math.floor(this.aimTrainerEl.clientWidth * 0.9 * Math.random());
  
        target.style.transform = `translate(${x}px, ${y}px)`;

        //translate and moves target to random coordinate
        this.timer = setInterval(() => {
            y = Math.floor(
              aimTrainer.aimTrainerEl.clientHeight * 0.9 * Math.random()
            );
            x = Math.floor(aimTrainer.aimTrainerEl.clientWidth * 0.9 * Math.random());
            target.style.transform = `translate(${x}px, ${y}px)`;
        }, 5000);

        //when player hits target, remove target child from list
        target.addEventListener("click", () => {
            target.parentNode.removeChild(target);
            clearInterval(this.timer);
            this.timer = null;
            this.onTargetHit();
        });
        
        //put target on page
        this.aimTrainerEl.append(target);
    }


}