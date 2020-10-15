
const Clarifai = require ('clarifai') ;
const app = new Clarifai.App({
 apiKey: '87b5eb01a1b44f60aa27702bed42544d'
});

const handleApiCall = (req ,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => res.json(data))
	.catch(err => res.json('Api call failure'))
} 


const handleImage = (req, res, db) => {
		const {id} = req.body

		db('users')
		  .where('id', '=', id)
		  .increment('entries', 1)
		  .returning('entries')
		  .then(entries => {
		  	if (entries.length){
		  		res.json(entries[0])
		  	}else{
		  		res.json("Unable to get count")
		  	}
		  	
		   })
		  .catch(err =>res.status(400).json('Not found'));
	}

module.exports ={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}