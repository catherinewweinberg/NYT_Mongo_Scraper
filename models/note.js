var mongoose = require("mongoose");
var { Schema } = mongoose;

var noteSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },

  noteText: String,
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  }
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
