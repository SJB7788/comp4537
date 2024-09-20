import { Notepad } from './note.js'
import { readerPage } from '/lang/messages/en/users.js';

const updatedText = document.getElementById("updated_text");
updatedText.innerHTML = readerPage.lastUpdated;

const container = document.querySelector(".notepad_container");
const notepad = new Notepad(container, "key123");
notepad.updateNoteFromStorage()
notepad.updateNoteFromStorageOnInterval()
