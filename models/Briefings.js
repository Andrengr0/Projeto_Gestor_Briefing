var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var briefingSchema = new Schema({
    idBriefing: Number,
    nomeCliente: String,
    titulo: String,
    descricao: String,
    estado: String,
    data: String,
    idUsuario: String
},{collection:'briefings'})

var Briefings = mongoose.model("Briefings",briefingSchema);

module.exports = Briefings;