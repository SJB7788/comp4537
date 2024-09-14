class Notepad {
  constructor(container) {
    this.notepadContainer = container
    this.createNoteButton = 
  }

  createNote(text) {
    // create new note object which already has button and noteRectangle populated 
    const note = new Note(text);
    // append the note to notepadContainer
    this.notepadContainer.appendChild(note);
  }

}

class Note {
  constructor(text) {
    // create new noteContainer
    this.noteContainer = document.createElement("div");
    this.noteContainer.className = "note_container";

    // create a noteRectangle and Button object
    this.note = new NoteRectangle(text);
    this.button = new Button();

    // add event listener to remove the note container 
    this.button.getButton().addEventListener('click', () => this.removeNote());

    // append the button and noteRectangle object to noteContainer div
    this.noteContainer.appendChild(this.note.getNoteElement());
    this.noteContainer.appendChild(this.button.getButton());
  }

  removeNote(container) {
    container.removeChild(this.noteContainer);
  }

  getNoteContainer() {
    return this.noteContainer;
  }
}

class NoteRectangle {
  constructor(text) {
    this.text = text;

    this.noteElement = document.createElement("div"); 
    this.noteElement.style.width = "10em";
    this.noteElement.style.height = "5em";
    this.textElement = document.createElement("p");
    this.textElement.innerHTML = this.text;
  }

  getNoteElement() {
    return this.noteElement;
  }
}

class Button {
  constructor() {
    this.button = document.createElement("button");
    this.button.innerHTML = "remove";
  }

  getButton() {
    return this.button;
  }
}