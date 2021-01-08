const mongoose =require("mongoose")

const Schema = new mongoose.Schema({
    text: {
        type: String
    }
})

module.exports = mongoose.model("Schema", Schema)