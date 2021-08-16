console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";
	e.preventDefault();
	const location = search.value;
	fetch("/weather/?address=" + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
				console.log(data.error);
			} else {
				messageOne.textContent = data.Location;
				messageTwo.textContent = data.forecast;
				console.log(data.Location);
				console.log(data.forecast);
			}
		});
	});
});
