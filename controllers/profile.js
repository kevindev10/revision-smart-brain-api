const handleProfile = (req, res, db) =>{
		const {id} = req.params
		db.select('*').from('users')
		.where('id', '=', id)
		.then(user => {
			if (user.length){
				res.json(user[0])
			}else{
				res.json('Not found 1')
			}
		})
		.catch(err => res.status(400).json('Not found 2'))
		
	}

module.exports ={
	handleProfile:handleProfile
}