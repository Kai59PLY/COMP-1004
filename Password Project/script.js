let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < 12; i++) {
        pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('password').value = pass;
}

function savePassword() {
    const app = document.getElementById('app').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!app || !username || !password) {
        alert("please filll all boxes");
        return;
    }

    passwords.push({ app, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));

    document.getElementById('app').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    if (!/[!@#$%^&*()]/.test(password)) {
        alert("Password must include at least one special character (!@#$%^&*()).");
        return;
    }

}

function exportPasswords() {
    const json = JSON.stringify(passwords, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);

    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'passwords.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function checkStrength() {
    const password = document.getElementById('password').value;
    const strengthDisplay = document.getElementById('strength');

    const hasSpecial = /[!@#$%^&*()]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (!password) {
        strengthDisplay.textContent = '';
        return;
    }

    if (password.length < 6) {
        strengthDisplay.textContent = 'Weak';
    } else if (hasLower && hasUpper && hasNumber && hasSpecial && password.length >= 10) {
        strengthDisplay.textContent = 'Strong';
    } else {
        strengthDisplay.textContent = 'Medium';
    }
}


