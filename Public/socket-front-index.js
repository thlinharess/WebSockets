import { insertLinkDoc, removeLinkDocument } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach((document) => {
        insertLinkDoc(document.name);
    });
})

function emitAddDocument(name) {
    socket.emit("add_document", name);
}

socket.on("add_document_interface", (name) => {
    insertLinkDoc(name);
});

socket.on("documents_exists", (name) => {
    alert(`document ${name} already exists!`);
})

socket.on("Delete_document_seccessfully", (name) => {
    removeLinkDocument(name);
})
export { emitAddDocument }