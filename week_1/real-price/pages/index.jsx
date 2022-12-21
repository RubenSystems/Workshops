import Head from 'next/head'
import Image from 'next/image'

import {useState} from 'react'

export default function Home() {

	const [current_quote, set_current_quote] = useState(undefined)

	return (
		<div>
			<Head>
				<title>RealPrice</title>
			</Head>
			<header>
				{/* Navigation */}
				<div className="px-20 py-4 flex items-center justify-between">
					<h2 className="font-semibold text-xl"> RealPrice </h2>
					<div className="space-x-10">
						<a>Pricing</a>
						<a>Company</a>
						<a>Join us</a>
					</div>
				</div>
				<div className="flex justify-between p-20 items-center">
					<div className="max-w-[512px] space-y-10 w-1/2">
						<h3 className="font-semibold text-2xl"> PricePredict by RealPrice</h3>
						<h1 className="font-bold text-4xl"> Unlock the value of California real estate with RealPrice and machine learning. </h1>
						<button className="bg-black text-white p-4 rounded-xl">Try it now</button>
					</div>
					<div className="w-1/2">
						<img className="w-full rounded-xl" src="https://images.unsplash.com/photo-1613070561201-b0dccb982856?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
					</div>
				</div>
			</header>
			{/* Form */}
			<section className="p-12 flex space-x-10">
				<form className="flex flex-col w-1/2 space-y-10" onSubmit={ evt => {
						evt.preventDefault()

						fetch("http://localhost:3000/api/predict", {
							method: "post",
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								longitude: evt.target.longitude.value,
								latitude: evt.target.latitude.value,
								house_age: evt.target.house_age.value,
								number_of_rooms: evt.target.number_of_rooms.value ,
								number_of_bedrooms: evt.target.number_of_bedrooms.value,
								income: evt.target.income.value
							})
						})
						.then( (response) => { 
							return response.json()
						}).then((json) => {
							set_current_quote(json.price)
						})

					}}>
					<input type="text" id="longitude" placeholder="Longitude" name="longitude" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="text" placeholder="Latitude" name="latitude" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="text" placeholder="House age" name="house_age" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="text" placeholder="Number of rooms" name="number_of_rooms" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="text" placeholder="Number of bedrooms" name="number_of_bedrooms" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="text" placeholder="How much do you earn" name="income" className="ountline-none border-4 p-4 rounded-xl"/>	
					<input type="submit" value="Get quote" className="bg-black text-white p-4 rounded-xl cursor-pointer"/>
				</form>
				<div class="flex justify-center items-center border-4 rounded-xl w-1/2">
					<p className="text-9xl font-bold">${Math.round(current_quote)}</p>
				</div>
			</section>
		</div>
	)
}
