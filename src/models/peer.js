const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PeerSchema = new Schema({
    url:String,
})

const Peer = mongoose.model("peers",PeerSchema);

module.exports = Peer;