import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://thiago-linhares:ThiagoLinhares1234@websockets.gzwjkli.mongodb.net/?retryWrites=true&w=majority")

let documentsCollection;

try{
    await client.connect();
    
    const db = client.db("websocket");
    documentsCollection = db.collection("documents");

    console.log("Database connection successful!");
}catch(error){
   console.log(error);
}

export { documentsCollection };