class Button {
    constructor(text, color) {
        this.text = text;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.button = this.createElement();
    }

    setXPosition(x) {
        this.x = x;     
    }

    setYPosition(y) {
        this.y = y; 
    }

    createElement() {
        const button = document.createElement("button");
        button.style.top = this.x
    }
}


