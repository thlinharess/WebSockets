import { getDocuments, addDocument, findDocument, updateDocument, deleteDocument } from "./documentsdb.js";
import io from "./server.js";


io.on("connection", (socket) => {
    socket.on("get_documents", async (returnDocuments) => {
        const documents = await getDocuments();

        returnDocuments(documents);
    });

    socket.on("select_Document", async (documentName, returnText) => {
        socket.join(documentName);

        const document = await findDocument(documentName);
        if(document) {
            returnText(document.text);
        }
    });

    socket.on("add_document", async (name) => {
        const documentExists = (await findDocument(name)) !== null;
        if(documentExists) {
            socket.emit("documents_exists", name);
        } else {
            const result = await addDocument(name);
            if(result.acknowledged) {
                io.emit("add_document_interface", name);
            }
        }
    })
    
    socket.on("text_editor", async ({ text, documentName }) => {
        const update = await updateDocument(documentName, text)
        if(update.modifiedCount) {
            socket.to(documentName).emit("text_editor_clients", text);
        }
    });

    socket.on("delete_document", async (name) => {
        const result = await deleteDocument(name);
        
        if(result.deletedCount){
            io.emit("Delete_document_seccessfully", name);
        }  
    })
});