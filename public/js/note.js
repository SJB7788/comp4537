export class LocalStorage {
  constructor() {}

  replaceNoteArrayLocal(key, value) {
    localStorage.setItem(key, value);
  }

  getNoteArrayLocal(key) {
    return localStorage.getItem(key);
  }
}

export class Notepad {
  constructor(container, key) {
    this.storage = new LocalStorage();
    this.storageKey = key;

    this.notepadContainer = container;
    this.noteArray = [];
    this.lastUpdated;
  }

  addNote(note) {
    this.noteArray.push(note);
    // add event listener to remove the note container
    note.button
      .getButton()
      .addEventListener("click", () => this.removeNote(note));
  }

  createNote(text) {
    // create new note object which already has button and noteRectangle populated
    const note = new Note(text);
    // push note into note array
    this.noteArray.push(note);

    // add event listener to remove the note container
    note.button
      .getButton()
      .addEventListener("click", () => this.removeNote(note));
    // add to local storage
    this.storage.replaceNoteArrayLocal(
      this.storageKey,
      JSON.stringify(this.noteArray)
    );
    // append the note to notepadContainer
    this.notepadContainer.appendChild(note.getNoteContainer());
  }

  removeNote(note) {
    this.notepadContainer.removeChild(note.getNoteContainer());
    this.noteArray.pop(note);
    this.storage.replaceNoteArrayLocal(
      this.storageKey,
      JSON.stringify(this.noteArray)
    );
  }

  editNote() {
    if (this.noteArray != []) {
      this.noteArray.forEach((note) => {
        const noteRectangle = note.note;
        const originalText = noteRectangle.text;
        const possibleChangeText = noteRectangle.textElement.value;

        if (originalText != possibleChangeText) {
          note.text = possibleChangeText;
          
          this.editNoteFromStorage(note);
        }
      });
    }
  }

  editNoteFromStorage() {    
    if (this.storage.getNoteArrayLocal(this.storageKey) != "") {
      this.storage.replaceNoteArrayLocal(
        this.storageKey,
        JSON.stringify(this.noteArray)
      );
    }
  }

  updateNoteFromStorage() {
    if (this.storage.getNoteArrayLocal(this.storageKey) != "") {
      const notes = JSON.parse(this.storage.getNoteArrayLocal(this.storageKey));
      this.clearNotePad();

      if (notes != null) {
        notes.forEach((note) => {
          this.createNote(note.text);
        });
      }
    }
  }

  writeNoteFromStorageOnInterval() {
    setInterval(() => {
      this.editNote();
      const date = new Date();
      // document.getElementById(
      //   "updated_text"
      // ).innerHTML = `Last Updated: ${date.toLocaleTimeString()} ${
      //   date.getHours() >= 12 ? "PM" : "AM"
      // }`;
    }, 2000);
  }

  updateNoteFromStorageOnInterval() {
    setInterval(() => {
      this.updateNoteFromStorage();
      const date = new Date();
      document.getElementById(
        "updated_text"
      ).innerHTML = `Last Updated: ${date.toLocaleTimeString()} ${
        date.getHours() >= 12 ? "PM" : "AM"
      }`;
    }, 2000);
  }

  clearNotePad() {
    this.notepadContainer.replaceChildren();
    this.noteArray = [];
    this.storage.replaceNoteArrayLocal(this.storageKey, this.noteArray);
  }
}

export class Note {
  constructor(text) {
    this.text = text;
    // create new noteContainer
    this.noteContainer = document.createElement("div");
    this.noteContainer.className = "note_container";

    // create a noteRectangle and Button object
    this.note = new NoteRectangle(text);
    this.button = new Button();

    // append the button and noteRectangle object to noteContainer div
    this.noteContainer.appendChild(this.note.getNoteElement());
    this.noteContainer.appendChild(this.button.getButton());
  }

  getNoteContainer() {
    return this.noteContainer;
  }

  getNoteRectangleElement() {
    return this.note.getNoteElement();
  }
}

export class NoteRectangle {
  constructor(text) {
    this.text = text;

    this.noteElement = document.createElement("div");
    this.noteElement.style.width = "10em";
    this.noteElement.style.height = "5em";
    this.noteElement.className = "note_rect_container";

    this.textElement = document.createElement("textarea");
    this.textElement.value = this.text;
    this.textElement.style.resize = "none";
    this.textElement.style.height = "50px";
    this.textElement.classList = "note_rect_p";

    this.noteElement.appendChild(this.textElement);
  }

  getNoteElement() {
    return this.noteElement;
  }

  getTextElementValue() {
    return this.textElement.value;
  }
}

export class Button {
  constructor() {
    this.button = document.createElement("button");
    this.button.innerHTML = "remove";
  }

  getButton() {
    return this.button;
  }
}
