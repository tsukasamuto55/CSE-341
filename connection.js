const {MongoClient} = require('mongodb');
require('dotenv').config();

async function main() {
    // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tmuto.biong.mongodb.net/cse341?retryWrites=true&w=majority`;
    const uri = process.env.DB_STRING;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

main().catch(console.error);

async function listDatabases(client) {
    // databasesList = await client.db().admin().listDatabases();
    databasesList = await client.db().admin();


    console.log("Databases:" + databasesList);
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};