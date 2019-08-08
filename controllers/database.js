const mongoose = require("mongoose");
const createFakeUsers = require("./user");
const UserModel = require("../models/user");

module.exports = {
    /* Connect to Mongo on localhost */
    connect: async () => {
        mongoose.connect("mongodb://localhost:27017/seed-test", {
            useNewUrlParser: true,
            useCreateIndex: true
        }).catch(error => {
            console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`);
            process.exit(1);
        });
    },

    /* Seeding the db */
    seed: async () => {
        console.log(`No Users in database, let's create some`);
        const fakeUser = createFakeUsers.create(10);
        const fakeUserModels = fakeUser.map(user => new UserModel(user).save());
        await Promise.all(fakeUserModels);
        console.log("Database seeding completed!");
    }
}