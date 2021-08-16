const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const forecast = (lat, lon, callback) => {
	weather_stack_access_key = process.env.weather_stack_access_key;
	const url =
		`http://api.weatherstack.com/current?access_key=${weather_stack_access_key}&query=` +
		encodeURIComponent(lat.toString()) +
		",";

	encodeURIComponent(lon.toString()) + "&units=f";

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback("Unable to connect to weatherstack", undefined);
		} else if (body.error) {
			console.log("Unable to find location");
			callback("Unable to find location", undefined);
		} else {
			const ans =
				body.current.weather_descriptions[0] +
				". It is currently " +
				body.current.temperature +
				" degrees out. It feels like " +
				body.current.feelslike +
				" degrees out. Currently, humidity is at " +
				body.current.humidity +
				"%.";

			callback(undefined, ans);
		}
	});
};
module.exports = forecast;
