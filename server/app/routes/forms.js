const formController = require('../controllers/forms');

module.exports = (app) => {

  app.route('/api/forms')
    .get(formController.allForms);
  app.route('/api/form')
    .post(formController.newForm);
  app.route('/api/form/:id')
    .get(formController.getForm);
  app.route('/api/form/:id')
    .post(formController.updateForm);
}