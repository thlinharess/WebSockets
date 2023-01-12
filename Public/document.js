import { emitTextEditor, selectDocument, emitDeleteDocument } from "./socket-front-doc.js";
 
const params = new URLSearchParams(window.location.search);
const documentName = params.get("name");

const textEditor = document.getElementById("text-editor");
const docTittle = document.getElementById("document-tittle");
const deleteButton = document.getElementById("delete_document");

docTittle.textContent = documentName || "Untitled document";


selectDocument(documentName);

textEditor.addEventListener("keyup", () => {
    emitTextEditor({
        text: textEditor.value, 
        documentName
    });
})

function updateTextEditor(text) {
    textEditor.value = text;
}
deleteButton.addEventListener("click", () => {
    emitDeleteDocument(documentName)
})

function alertAndRedirect(name) {
    if(name === documentName) {
        alert(`${name} document removed!`);
        window.location.href = "/";
    }
}

export { updateTextEditor, alertAndRedirect }; 