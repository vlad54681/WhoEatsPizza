
const button = document.getElementById('load-btn');
const btnCntnr = document.querySelector('.button_container');
const circle = document.querySelector('.circle');
const eatersBox = document.querySelector('.eaters');
const pizza = document.querySelector('.pizza_container');
const textUnder = document.querySelector('.eaters');
let isFirstRender = true;

function refreshCircle() {
	while (circle.firstChild) {
		circle.removeChild(circle.firstChild);
	}
}

function positionElements() {
	button.disabled = true;

	btnCntnr.style.cssText = `
		display: flex;
		width: 500px;
		transition: all 2s ease;
		`;
	pizza.style.cssText = `
		width: 500px;
		height: 100%;
		display: flex;
		opacity: 1;
		padding: 0 10px;
		transform: translate(0, 0);
		transition: all 2s ease;
		
		`;
	setTimeout(() => {
		circle.style.opacity = '1';
		textUnder.style.opacity = '1';

	}, 2000);
}


let members;
let eaters;

async function getMembers() {
	const url = 'https://gp-js-test.herokuapp.com/pizza';
	const response = await fetch(url);
	const data = await response.json();
	members = data.party.length;
	eaters = data.party.filter(data => data.eatsPizza == true).length
}

function cutPizza() {
	let deg = Math.round(360 / eaters);

	for (let i = 0, b = 90; i < eaters / 2; i++, b = b + deg) {
		circle.insertAdjacentHTML(
			'beforeend',
			`<li class=deg${b}></li>`
		)

		document.querySelector(`.deg${b}`).style.transform = `rotate(${b}deg) `;
	}
	eatersBox.innerHTML = `<div class="text">There are ${members} party members,<br/>but pizza is only for ${eaters} :)</div>`;
}

button.addEventListener('click', async () => {
	button.disabled = true;
	const instanceButton = button.innerHTML;
	button.classList.add('loading');
	button.innerHTML = 'Waiting...';

	const circleChildren = circle.children;

	if (circleChildren.length) refreshCircle()

	await getMembers()

	if (isFirstRender) {
		isFirstRender = false;
		positionElements()
		setTimeout(() => {
			cutPizza()
			button.classList.remove('loading');
			button.innerHTML = instanceButton;
			button.disabled = false
		}, 2000);
	} else {
		button.classList.remove('loading');
		cutPizza()
		button.innerHTML = instanceButton;
		button.disabled = false
	}
})

