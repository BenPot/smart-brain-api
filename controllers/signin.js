const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('cannot signin');
	}
	db.select('*').from('login')
		.where('email', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				return db('users').select('*').where('email', data[0].email)
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('cannot load the user'));
			} else {
				res.json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('cannot load the user'));
}

module.exports = {
	handleSignin
}