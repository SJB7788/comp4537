import { Notepad } from "./index.js";

const container = document.querySelector(".notepad_container");
const notepad = new Notepad(container, "key123");
notepad.updateNoteFromStorage();

const refreshButton = document.querySelector("#refresh_button");
refreshButton.addEventListener("click", () => notepad.updateNoteFromStorage());

const addButton = document.querySelector("#create_note_button");
const textField = document.getElementById("create_note_input");

addButton.addEventListener("click", () => {
  notepad.createNote(textField.value);
  textField.value = "";
});
