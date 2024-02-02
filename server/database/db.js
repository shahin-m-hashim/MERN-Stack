const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDb = async (dbName = '') => {
    console.log(`Connecting to the database ...`);
    try {
        const db = await mongoose.connect(MONGODB_URI + dbName);
        console.log(`Connected to the database ${dbName} successfully`);
        return db;
    } catch (e) {
        console.error(`Error connecting to the database ${dbName}: ${e.message}`);
    }
};

module.exports = connectToDb;

/*
    In a real-world production environment, where your server is running 24/7, it's common practice 
    to maintain an active database connection for the duration of your server's uptime. When your Node.js 
    server is running continuously, you typically want to keep the database connection open to ensure 
    efficient access to the database.

    In such scenarios, you can rely on Mongoose's automatic management of the database connection. Mongoose 
    takes care of connection pooling, maintaining connections, and handling reconnection, so you generally
    do not need to worry about explicitly opening and closing the database connection.

    By leaving the database connection active while your server is running, you ensure that your server can 
    efficiently process incoming database queries without incurring the overhead of opening and closing 
    connections for each request.

    This approach aligns with industry best practices for maintaining a healthy and efficient Node.js 
    application, as well as ensuring optimal performance and scalability.
*/