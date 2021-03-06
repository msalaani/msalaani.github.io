//  VARIABLES
// generating a random number between 0 and 9
let generatedNumber = Math.floor(Math.random() * 10);

let form = document.querySelector('#form'),
	inputNumber = document.querySelector('#userInput'),
	info = document.querySelector('#info'),
	submit = document.querySelector('#submit');



let attempts = 3;

//  EVENT LISTENERS
form.addEventListener('submit', startGame);

//  FUNTIONS
function startGame(e) {
	e.preventDefault();
	let userNumber = inputNumber.value;
	// Generating number using our api resteay
	const Http = new XMLHttpRequest();
	const url='http://localhost:8080/rest-demo-1.0/rest/get_rand';
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = function()  {
		if (Http.readyState == 4){
			if (Http.status==200)
			{
				//console.log(Http.responseText)
	obj = JSON.parse(Http.responseText);
	if (userNumber != '') {
		attempts--;
		inputNumber.value = '';
		//console.log('You Entered: ', userNumber);
		//console.log('Correct Answer: ', obj.get_rand);
		//console.log('Attempts Remaining: ', attempts);
		gameLogic(userNumber);
	}
	else {
		alert('Enter a Number: ');
		inputNumber.focus();
	}
			}
		}
	
	}
	
	
}

function gameLogic(userNumber) {
	const Http = new XMLHttpRequest();
	const url='http://localhost:8080/rest-demo-1.0/rest/verify/'+userNumber;
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = function()  {
		if (Http.readyState == 4){
			if (Http.status==200)
			{
				//console.log(Http.responseText)
				obj = JSON.parse(Http.responseText);
				let verify = obj.verify;
				if (verify == 1 && attempts >= 0) {
					let str = `${userNumber} is correct`;
					info.style.color = 'green';
					info.innerHTML = str;
					// reseting values
					attempts = 3;
					//generatedNumber = Math.floor(Math.random() * 10);
				}
				else {
					let str = `${userNumber} is not correct, you have ${attempts} guesses left`;
					info.style.color = 'red';
					info.innerHTML = str;
					if (attempts == 0) {
						endGame();
					}
				}
			}
		}
	
	}

	
}

function endGame() {
	submit.disabled = true;
	let str = `Game Over, The correct answer was ${generatedNumber} <br> To replay, reload the page`;
	info.style.color = 'red';
	info.innerHTML = str;
}