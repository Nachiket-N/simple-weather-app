const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const geocode = (address, callback) => {
	mapbox_access_token = process.env.MAPBOX_ACCESS_TOKEN;

	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		`.json?access_token=${mapbox_access_token}&limit=1`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback("Unable to connect to location services", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search.", undefined);
		} else {
			//console.log(body);
			callback(undefined, {
				Latitude: body.features[0].center[1],
				Longitude: body.features[0].center[0],
				Location: body.features[0].place_name,
			});
		}
	});
};
module.exports = geocode;
