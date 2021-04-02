const mongoose = require('mongoose');
const modelForm = mongoose.model('forms');


let formController = {};

formController.allForms = (req, res) => {

  modelForm.find()
    .then(results => res.json(results))
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
}

formController.newForm = (req, res) => {

  console.log(req.body);
  let newForm = new modelForm({formConfig: req.body} );

  newForm.save()
    .then((resp) => {
      console.log(resp);
      res.json({ success: true, message: 'Form created with success!', statusCode: 201, _id: resp._id })
    })
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
}


formController.updateForm = (req, res) => {

  let { id } = req.params;
  console.log(req.body);

  modelForm.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {formConfig: req.body}, { new: true})
    .then((resp) => {
      res.json({ success: true, message: 'Form updated with success!', statusCode: 201, _id: resp._id })
    })
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
}

formController.getForm = (req, res) => {

  let { id } = req.params;

  console.log(id);
  if(!id) return res.json({ success: false, message: err, statusCode: 500 })

  modelForm.findById(id)
    .then(results => res.json(results))
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
}

module.exports = formController;