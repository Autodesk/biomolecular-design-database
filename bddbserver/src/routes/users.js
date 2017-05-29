import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';


let router = express.Router();


function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);
	
	return Promise.all([
		User.where({ email: data.email }).fetch().then(user => { //fetch user where email === data.email 
			if(user) { errors.email = 'There is a user with such email';}
		}), //Queries to database
		User.where({ username: data.username }).fetch().then(user => {
			if(user) { errors.username = 'This Username is taken';}
		})
	]).then(() => {
		return {
			errors,
			isValid: isEmpty(errors)
		};
	});
}

router.post('/', (req, res) => {
	validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
		if(isValid) {
			const {username, password, email } = req.body;
			const password_digest = bcrypt.hashSync(password, 10);

			User.forge({
				username, email, password_digest
			}, { hasTimestamps: true }).save() //save returns 'promise' so we can use then/catch
			.then(user => res.json({ success: true })) //All GOOD
			.catch(err => res.status(500).json({error: err})); //Something went wrong
		} else {
		 	res.status(400).json(errors);
		}
	});
});


export default router;