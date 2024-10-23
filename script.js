document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const pin = document.getElementById('pin').value;
    const dob = document.getElementById('dob').value;

    const passwordStrength = checkPasswordStrength(password, name);
    const pinStrength = checkPinStrength(pin, dob);
    
    displayResponse(name, password, passwordStrength, pin, pinStrength);
});

function checkPasswordStrength(password, name) {
    let strength = 'Too Easy';
    let width = 20;
    let color = 'red';

    // Check if the password contains the user's name
    if (password.includes(name)) {
        strength = 'Weak';
        width = 30;
        color = 'orange';
    } else if (password.length >= 8) {
        strength = 'Medium';
        width = 60;
        color = 'orange';
        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[@$!%*?&#]/.test(password)) {
            strength = 'Strong';
            width = 100;
            color = 'green';
        }
    } else if (password.length >= 5) {
        strength = 'Weak';
        width = 40;
        color = 'yellow';
    }

    const strengthMessage = document.getElementById('strengthMessage');
    const passwordMeter = document.getElementById('passwordMeter');

    strengthMessage.textContent = `Password Strength: ${strength}`;
    passwordMeter.style.width = `${width}%`;
    passwordMeter.style.background = color;

    return strength;
}

function checkPinStrength(pin, dob) {
    let strength = 'Too Easy';
    let width = 20;
    let color = 'red';

    // Check if the PIN contains the birthday (in YYYY-MM-DD format)
    if (dob && pin.includes(dob.replace(/-/g, ''))) {
        strength = 'Weak';
        width = 30;
        color = 'orange';
    } else if (pin.length >= 6) {
        strength = 'Strong';
        width = 100;
        color = 'green';
    } else if (pin.length >= 4) {
        strength = 'Medium';
        width = 60;
        color = 'orange';
    } else if (pin.length >= 2) {
        strength = 'Weak';
        width = 40;
        color = 'yellow';
    }

    const pinStrengthMessage = document.getElementById('pinStrengthMessage');
    const pinMeter = document.getElementById('pinMeter');

    pinStrengthMessage.textContent = `PIN Strength: ${strength}`;
    pinMeter.style.width = `${width}%`;
    pinMeter.style.background = color;

    return strength;
}

function displayResponse(name, password, passwordStrength, pin, pinStrength) {
    const responseList = document.getElementById('responseList');
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${name}, Password: ${'*'.repeat(password.length)} (${passwordStrength}), PIN: ${'*'.repeat(pin.length)} (${pinStrength})`;
    responseList.appendChild(listItem);
}
