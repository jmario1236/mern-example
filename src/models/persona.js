const mongoose = require('mongoose');
const { Schema } = mongoose;

const PersonaSchema = Schema({
    name: { type:String, require: true },
    lastname: { type: String, require: true },
    phone: {type: Number, require: true} 
});

module.exports = mongoose.model('Persona',PersonaSchema);