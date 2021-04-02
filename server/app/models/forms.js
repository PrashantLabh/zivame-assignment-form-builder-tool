const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  
  formConfig: {
    type: Array,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  history: {
    type: Array
  }
});

mongoose.model('forms', formSchema);