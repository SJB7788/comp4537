import { Notepad } from './index.js'

const container = document.querySelector(".notepad_container");
const notepad = new Notepad(container, "key123");
notepad.updateNoteFromStorage()

const refreshButton = document.querySelector("#refresh_button");
refreshButton.addEventListener("click", () => notepad.updateNoteFromStorage());