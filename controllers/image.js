const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'abb292910202471f9e7e21be60418868'
});

const handleAPICall = () => (req, res) => {
	app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => {
      	res.status(400).json('cannot process the image');
      })
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		})
		.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage,
	handleAPICall
}