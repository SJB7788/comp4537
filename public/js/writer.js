import { Notepad } from "./note.js";
import { writerPage } from '../lang/messages/en/users.js';

const refreshButton = document.getElementById("refresh_button");
const createNoteButton = document.getElementById("create_note_button");

refreshButton.innerHTML = writerPage.refresh;
createNoteButton.innerHTML = writerPage.add;

const container = document.querySelector(".notepad_container");
const notepad = new Notepad(container, "key123");
notepad.updateNoteFromStorage();

refreshButton.addEventListener("click", () => notepad.updateNoteFromStorage());

const addButton = document.querySelector("#create_note_button");
const textField = document.getElementById("create_note_input");

addButton.addEventListener("click", () => {
  notepad.createNote(textField.value);
  textField.value = "";
});
