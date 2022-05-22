const router = require('express').Router();
// const ObjectId = require('mongodb').ObjectId;
const db = require('../models');
const User = db.user;

// show all contacts
router.get('/', (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        note:
          err.note ||
          'Retreiving the user information has not completed due to an error.',
      });
    });
});

router.post('/', (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, res) => {
    if (err) res.status(500).json(err);
  });
  res.status(201).json(`New contact Id: ${newUser._id}`);
});

// // Show one contact
// router.get('/:id', (req, res) => {
//   const contactId = new ObjectId(req.params.id);
//   const results = connect.getCollection().find({ _id: contactId });

//   results.toArray().then((contact_list) => {
//     res.render('contacts/index', { contacts: contact_list });
//     console.log(`Returned Contact: ${req.params.id}`);
//   });
// });

// // edit a contact
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   let contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     favoriteFood: req.body.favoriteFood,
//     location: req.body.location,
//     hobby: req.body.hobby,
//     birthday: req.body.birthday,
//   };

//   Contact.findByIdAndUpdate(id, contact, { new: true }, (err) => {
//     if (err) return res.status(500).send(err);
//     return res.status(204).send();
//   });
// });

// // delete a contact
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   const response = {
//     message: 'Contact has been removed',
//     _id: id,
//   };

//   Contact.findByIdAndRemove(id, (err) => {
//     if (err) return res.status(500).send(err);

//     return res.status(200).send(response);
//   });
// });

module.exports = router;
