/** @format */

const passwordField = document.getElementById('password');
const generateBtn = document.getElementById('generateBtn');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const strengthBar = document.getElementById('strengthBar');
const copyMessage = document.getElementById('copyMessage');

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    const length = +lengthSlider.value;
    const hasUppercase = includeUppercase.checked;
    const hasLowercase = includeLowercase.checked;
    const hasNumbers = includeNumbers.checked;
    const hasSymbols = includeSymbols.checked;

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charSet = '';
    if (hasUppercase) charSet += upperCaseChars;
    if (hasLowercase) charSet += lowerCaseChars;
    if (hasNumbers) charSet += numberChars;
    if (hasSymbols) charSet += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    passwordField.value = password;

    assessStrength(password);

    hideCopyMessage();
}

function assessStrength(password) {
    const strength = calculateStrength(password);
    strengthBar.style.width = `${strength}%`;
    if (strength < 30) {
        strengthBar.style.backgroundColor = 'red';
    } else if (strength < 60) {
        strengthBar.style.backgroundColor = 'orange';
    } else {
        strengthBar.style.backgroundColor = 'green';
    }
}

function calculateStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[\W_]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 20;
    return strength;
}

function copyPassword() {
    passwordField.select();
    document.execCommand('copy');

    copyMessage.classList.remove('hidden');

    setTimeout(hideCopyMessage, 2000);
}

function hideCopyMessage() {
    copyMessage.classList.add('hidden');
}
