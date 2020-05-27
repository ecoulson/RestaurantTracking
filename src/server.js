require("dotenv").config()
const app = require("./app");
const mongoose = require("mongoose");

main();

async function main() {
    await connectToDatabase();
    startServer();
}

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Successfully connected to database");
    } catch (error) {
        throw error;
    }
}

function startServer() {
    app.listen(process.env.PORT, () => {
        process.stdout.write(`Listening at http://${process.env.HOST_NAME}:${process.env.PORT}\n`);
    })
}