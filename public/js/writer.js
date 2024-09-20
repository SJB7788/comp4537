import { Notepad } from "./note.js";
import { writerPage } from '../lang/messages/en/users.js';

const updatedText = document.getElementById("updated_text");
const createNoteButton = document.getElementById("create_note_button");

createNoteButton.innerHTML = writerPage.add;
updatedText.innerHTML = writerPage.lastUpdated;

const container = document.querySelector(".notepad_container");
const notepad = new Notepad(container, "key123");
notepad.updateNoteFromStorage();
notepad.writeNoteFromStorageOnInterval();

const addButton = document.querySelector("#create_note_button");
const textField = document.getElementById("create_note_input");

addButton.addEventListener("click", () => {
  notepad.createNote(textField.value);
  textField.value = "";
});
