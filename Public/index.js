import { emitAddDocument } from "./socket-front-index.js";

const documentList = document.getElementById("document-list");
const form = document.getElementById("form-add-document");
const inputDocument = document.getElementById("input-document");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    emitAddDocument(inputDocument.value);
    inputDocument.value = "";
})

function insertLinkDoc(documentName){
  documentList.innerHTML += `
  <a 
  href="documento.html?name=${documentName}" 
  class="list-group-item list-group-item-action"
  id="document-${documentName}"
 >
 ${documentName}
 <a/>
 `
}

function removeLinkDocument(documentName) {
    const documentRemoved = document.getElementById(`document-${documentName}`)

    documentList.removeChild(documentRemoved);
}

export { insertLinkDoc, removeLinkDocument };