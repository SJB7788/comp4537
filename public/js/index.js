import { indexPage } from '../../lang/messages/en/users.js';

const h1Lab1 = document.getElementById("title");
const aReader = document.getElementById("index_reader");
const aWriter = document.getElementById("index_writer");

h1Lab1.innerHTML = indexPage.title;
aReader.innerHTML = indexPage.aReader;
aWriter.innerHTML = indexPage.aWriter;
