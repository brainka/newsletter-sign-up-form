const subscribeButtonElement = document.querySelector('#subscribe-button');
const emailAddressInputElement = document.querySelector('#mail');
const errorMessageElement = document.querySelector('.error-message');
const mainImageElement = document.querySelector('.main-image');
const infoContainerElement = document.querySelector('.info-container');
const successPageElement = document.querySelector('.success-page-container');
const mainElement = document.querySelector('main');
const dismissButtonElement = document.querySelector('#dismiss-button');

const fetchUserLocalStorage = JSON.parse(localStorage.getItem('user')) || {};

function handleButtonClick(event) {
	event.preventDefault();

	const emailInputValue = emailAddressInputElement.value;
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const validEmailAddress = emailFormat.test(emailInputValue);
	const setFocus = emailInputValue === '' || !validEmailAddress;

	errorMessageElement.hidden = !setFocus;

	emailAddressInputElement.classList.toggle(
		'error-message-input',
		emailInputValue === '' || !validEmailAddress
	);

	if (setFocus) {
		emailAddressInputElement.focus();
	} else {
		mainImageElement.classList.add('hidden', 'aria-hidden="true"');
		infoContainerElement.classList.add('hidden', 'aria-hidden="true"');
		successPageElement.classList.remove('hidden');
		successPageElement.removeAttribute('aria-hidden');
		mainElement.classList.add('success-message-main');
		document.querySelector('#email-address').textContent =
			emailInputValue + '.';
		emailAddressInputElement.value = '';

		localStorage.setItem(
			'user',
			JSON.stringify({
				email: emailInputValue,
				subscribed: true,
			})
		);
	}
}

subscribeButtonElement.addEventListener('click', handleButtonClick);

function handleDismissButtonClick(event) {
	event.preventDefault();

	successPageElement.classList.add('hidden');
	mainImageElement.classList.remove('hidden', 'aria-hidden="true"');
	infoContainerElement.classList.remove('hidden', 'aria-hidden="true"');
	mainElement.classList.remove('success-message-main');

	localStorage.removeItem('user');
}

dismissButtonElement.addEventListener('click', handleDismissButtonClick);

//utilise local storage on page refresh to keep the 'thanks for subscribing message'
if (fetchUserLocalStorage?.subscribed) {
	mainImageElement.classList.add('hidden', 'aria-hidden="true"');
	infoContainerElement.classList.add('hidden', 'aria-hidden="true"');
	successPageElement.classList.remove('hidden');
	successPageElement.removeAttribute('aria-hidden');
	mainElement.classList.add('success-message-main');

	document.querySelector('#email-address').textContent =
		fetchUserLocalStorage.email + '.';
}
