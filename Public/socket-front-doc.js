import { updateTextEditor, alertAndRedirect } from "./document.js";

const socket = io();

function selectDocument(name) {
    socket.emit("select_Document", name, (text) => {
        updateTextEditor(text);
    })
}

function emitTextEditor(datas) {
    socket.emit("text_editor", datas);
}

socket.on("text_editor_clients", (text) => {
    updateTextEditor(text);
})

function emitDeleteDocument(name) {
    socket.emit("delete_document", name);
}

socket.on("Delete_document_seccessfully", (name) => {
    alertAndRedirect(name);
})

export { emitTextEditor, selectDocument, emitDeleteDocument };