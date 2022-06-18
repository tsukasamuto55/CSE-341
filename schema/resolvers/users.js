// const db = require('../../models/index');
// const { ApolloError } = require('apollo-server-errors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// module.exports = {
//   Mutation: {
//     async signupUser(
//       _,
//       { signupInput: { username, email, password, confirmPassword } }
//     ) {
//       if (!(email && password && username && confirmPassword)) {
//         throw new ApolloError('Please enter all required fields');
//       }

//       const oldUser = await db.user.findOne({ email });

//       if (oldUser) {
//         throw new ApolloError(
//           'A user is already registered with the email: ' + email,
//           'USER_ALREADY_EXISTS'
//         );
//       }

//       if (password === confirmPassword) {
//         var encryptedPassword = await bcrypt.hash(password, 10);
//       } else new ApolloError('Password must match');

//       const newUser = new db.user({
//         username: username,
//         email: email.toLowerCase(),
//         password: encryptedPassword,
//       });

//       const token = jwt.sign({ user_id: newUser._id, email }, 'UNSAFESTRING', {
//         expiresIn: '1h',
//       });

//       newUser.token = token;

//       const res = await newUser.save();

//       return {
//         id: res.id,
//         ...res._doc,
//       };
//     },
//     async loginUser(_, { loginInput: { email, password } }) {
//       if (!(email && password)) {
//         throw new ApolloError('Please enter all required fields.');
//       }
//       const user = await db.user.findOne({ email });

//       if (user && (await bcrypt.compare(password, user.password))) {
//         // Create token
//         const token = jwt.sign({ user_id: user._id, email }, 'UNSAFESTRING', {
//           expiresIn: '1h',
//         });

//         // save user token
//         user.token = token;

//         return {
//           id: user.id,
//           ...user._doc,
//         };
//       } else {
//         throw new ApolloError('Incorrect credentials. Please try again.');
//       }
//     },
//     async editUser(_, { ID, userInput: { username, email, password } }) {
//       const wasEdited = (
//         await db.user.updateOne(
//           { _id: ID },
//           { username: username, email: email, password: password }
//         )
//       ).modifiedCount;

//       if (wasEdited > 0) return wasEdited;
//       else throw new ApolloError('No information has been modified.');
//     },

//     async deleteUser(_, { ID }) {
//       const wasDeleted = (await db.user.deleteOne({ _id: ID })).deletedCount;
//       if (wasDeleted > 0) return wasDeleted;
//       else throw new ApolloError("User hasn't been deleted successfully.");
//     },
//   },
//   Query: {
//     async getUser(_, { ID }) {
//       return await db.user.findById(ID);
//     },
//     async getUsers(_, args) {
//       return await db.user.find();
//     },
//   },
// };
