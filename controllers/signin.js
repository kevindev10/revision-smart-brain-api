
const handleSignin = (req, res, bcrypt, db) =>{
	const {email, password} = req.body;
	if(!email || !password){
		return res.json("Unable to signin")
	}
		db.select('email','hash').from('login')
		.where('email', '=',email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=',email)
				.then(data => {
					res.json(data[0])
				})
			}else{
				res.status(400).json('Invalid credentials');
			}
		})

		.catch(err => res.status(400).json('Not found 1'))
	
		
	}

module.exports ={
	handleSignin : handleSignin
}