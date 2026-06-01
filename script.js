const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const emailInput = document.querySelector('#email-input');
const selectedQueryRadioInput = document.querySelector(
  'input[name="query-type"]:checked'
);

const messageInput = document.querySelector('#message');
const consentCheckbox = document.querySelector('#consent');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstName = validateTextInput(firstNameInput);
  const lastName = validateTextInput(lastNameInput);
  const email = validateTextInput(emailInput);
  const message = validateTextInput(messageInput);
});

function validateTextInput(textInput) {
  const value = textInput.value.trim();
  const fieldError = textInput.closest('label').querySelector('.field__error');

  if (!value) {
    textInput.classList.add('text-field__input--error');
    fieldError.classList.add('field__error--show');
    return;
  }
  textInput.classList.remove('text-field__input--error');
  fieldError.classList.remove('field__error--show');

  return value;
}
