// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as tf from '@tensorflow/tfjs';

class ModelStorage {
	constructor() {
		this.model = null;
	}

	async g_model(url)  {
		if (this.model == null) {
			return await tf.loadLayersModel(url);
		} else {
			return this.model;
		}
	}
}


const model_storage = new ModelStorage();

async function handler(req, res){


	const {
		longitude,
		latitude,
		house_age,
		number_of_rooms,
		number_of_bedrooms,
		income
	} = req.body

	console.log(req.body)

	const scale_factor = 10_000
	const model = await model_storage.g_model("http://localhost:3000/model.json")
	const x = tf.tensor([[
		parseFloat(longitude) / scale_factor, 
		parseFloat(latitude) / scale_factor, 
		parseFloat(house_age) / scale_factor, 
		parseFloat(number_of_rooms) / scale_factor, 
		parseFloat(number_of_bedrooms) / scale_factor, 
		parseFloat(income) / scale_factor
	]]);
	const prediction = model.predict(x).dataSync()[0];
	res.status(200).json({ price: prediction * scale_factor })
}


export default handler;