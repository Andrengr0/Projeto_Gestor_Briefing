var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var briefingSchema = new Schema({
    idBriefing: Number,
    nomeCliente: String,
    titulo: String,
    descricao: String,
    estado: String,
    orcamento: String,
    prazoFinal: Date,
    data: Date,
    idUsuario: String,
    listUsuariosCompart: [String],
    autorizacao: Boolean
},{collection:'briefings'});

var Briefings = mongoose.model("Briefings",briefingSchema);

module.exports = Briefings;

