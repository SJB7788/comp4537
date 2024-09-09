class MemoryGame {
  constructor(buttonCount) {
    this.container = document.getElementById("game_container");

    this.buttonClicked = [];
    this.buttonArray = [];
    for (let count = 0; count < buttonCount; count++) {
      const buttonText = count + 1;
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      const button = new Button(buttonText, randomColor, this.container);
      button.button.className = "game_content";
      button.button.addEventListener("click", () => {
        this.handleClick(count);
      });
      this.buttonArray.push(button);
    }

    this.gameState = false;
    this.handleGameStart();
  }

  handleClick(index) {
    if (this.gameState) {
      const currentButton = this.buttonArray[index];
      if (this.buttonClicked.length < this.buttonArray.length) {
        this.buttonClicked.push(currentButton);

        if (
          this.buttonArray[this.buttonClicked.length - 1].text !=
          currentButton.text
        ) {
            this.gameState = false;
          this.handleGameOver(false);
        }
      }

      if (this.buttonClicked.length === this.buttonArray.length) {
        this.gameState = false;
        this.handleGameOver(true);
      }
    }
  }

  handleGameStart() {
    this.gameState = true;
    setTimeout(this.buttonArray.length * 1000);
    this.scrambleButtons(this.buttonArray);
  }

  handleGameOver(win) {
    const message = document.createElement("h1");
    message.className = "game_content";
    message.className += " game_message";
    if (win) {
      message.innerHTML = "Excellent memory!";
    } else {
      message.innerHTML = "Wrong order!";
    }
    this.container.appendChild(message);
  }

  scrambleButtons(buttonArray) {
    let scrambleCount = 0;

    const scrambleInterval = setInterval(() => {
      if (scrambleCount >= 3) {
        clearInterval(scrambleInterval);
        buttonArray.forEach((button) => {
          button.hideText();
          button.button.disabled = false;
        });
        return;
      }

      buttonArray.forEach((button) => {
        const containerRect = this.container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const randomTop = Math.random() * (containerHeight - 74);
        const randomLeft = Math.random() * (containerWidth - 144);
        const top = `${randomTop}px`;
        const left = `${randomLeft}px`;

        button.button.style.position = "absolute";
        button.moveX(left);
        button.moveY(top);
      });

      scrambleCount++;
    }, 2000);
  }
}

class Button {
  constructor(text, color, container) {
    this.button = document.createElement("button");
    this.text = text;
    this.button.innerHTML = text;

    this.button.style.backgroundColor = color;
    this.button.style.color = "black";
    this.button.style.fontSize = "1em";
    this.button.style.height = "5em";
    this.button.style.width = "10em";
    this.button.style.top = "0px";
    this.button.disabled = true;
    container.appendChild(this.button);
  }

  moveX(x) {
    this.button.style.top = x;
  }

  moveY(y) {
    this.button.style.left = y;
  }

  hideText() {
    this.button.innerHTML = "";
  }

  showText() {
    this.button.innerHTML = this.text;
  }
}

const inputBox = document.getElementById("ball_input");
const startButton = document.getElementById("go_button");
startButton.addEventListener("click", () => {
  const allButtons = document.querySelectorAll(".game_content");
  if (allButtons) {
    allButtons.forEach((button) => {
      button.remove();
    });
  }
  const numberOfButtons = parseInt(inputBox.value);
  const game = new MemoryGame(numberOfButtons);
  game.gameState = true;
});
