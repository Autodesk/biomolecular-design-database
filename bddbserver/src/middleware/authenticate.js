import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1]; //authorization header: 'Bearer <token>' 
													//split and take the index 1 to access token
	}

	if(token){
		jwt.verify(token, config.jwtSecret, (err, decode) => {
			if(err) {
				res.status(401).json({ error: 'Failed to authenticate'})
			} else {
				User.query({
					where: { id: decode.id },
					select: ['email', 'id', 'username' ]
				}).fetch().then(user => { //fetch user with the given user id
					if(!user){
						res.status(404).json({ error: 'No such user' });
					} else {
						req.currentUser = user;
						next();
					}
				});
			}
		});
	} else{
		res.status(403).json({	error: 'No token provided' 	});
	}
}