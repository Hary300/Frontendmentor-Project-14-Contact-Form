const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const emailInput = document.querySelector('#email-input');
const messageInput = document.querySelector('#message-input');
const toast = document.querySelector('.toast');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedQueryRadioInput = document.querySelector(
    'input[name="query-type"]:checked'
  );

  const consentCheckboxInput = document.querySelector(
    'input[name="consent"]:checked'
  );

  const firstName = validateTextInput(firstNameInput);
  const lastName = validateTextInput(lastNameInput);
  const email = validateTextInput(emailInput);
  const message = validateTextInput(messageInput);

  const query = validateSelectionInput('query-type', 'radio-field');

  const consent = validateSelectionInput('consent', 'checkbox-field');

  if (!firstName || !lastName || !email || !message || !query || !consent)
    return;

  const data = {
    firstName,
    lastName,
    email,
    message,
    query,
    consent,
  };

  sendMessage(data);

  toast.classList.add('toast--show');
  setTimeout(() => toast.classList.remove('toast--show'), 2000);
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

function validateSelectionInput(name, field) {
  const fieldset = document.querySelector(`.${field}`);
  const fieldError = fieldset.querySelector('.field__error');

  const selectionInput = document.querySelector(
    `input[name="${name}"]:checked`
  );

  if (!selectionInput) {
    fieldError.classList.add('field__error--show');
    return;
  }

  fieldError.classList.remove('field__error--show');
  return selectionInput.value;
}

async function sendMessage(data) {
  const res = await fetch(
    'https://personal-project-23-contact-message-backend-production.up.railway.app/contact_messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = new Error(res.status);
    throw err;
  }

  const responseData = await res.json();
  console.log(responseData);
}
