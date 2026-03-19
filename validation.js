
function validateForm() {
    let errorBox = document.getElementById('error-box');
    errorBox.innerHTML = '';
    errorBox.style.display = 'none';

    let username        = document.getElementById('username').value.trim();
    let email           = document.getElementById('email').value.trim();
    let phone           = document.getElementById('phone').value.trim();
    let password        = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let genderSelected  = document.querySelector('input[name="gender"]:checked');
    let ageGroup        = document.getElementById('ageGroup').value;

    let messages = []; // { pre, highlight, color }

    // ── 1. USERNAME ──────────────────────────────────────────────
    if (username === '') {
        messages.push({ pre: 'Please Enter ', highlight: 'Username', color: 'red' });
    } else {
        let usernameRegex = /^[a-z0-9]{4,12}$/;
        if (!usernameRegex.test(username)) {
            messages.push({ pre: 'Please Enter', highlight: ' a valid username', color: 'orange' });
        }
    }

    // ── 2. EMAIL ─────────────────────────────────────────────────
    if (email === '') {
        messages.push({ pre: 'Please Enter ', highlight: 'Email', color: 'red' });
    } else {
        let emailRegex = /^[^\s@]+@[^\s@]+\.(net|com|org|edu)$/i;
        if (!emailRegex.test(email)) {
            messages.push({ pre: 'Please Enter', highlight: ' a valid email', color: 'orange' });
        }
    }

    // ── 3. PHONE NUMBER ──────────────────────────────────────────
    if (phone === '') {
        messages.push({ pre: 'Please Enter ', highlight: 'Phone Number', color: 'red' });
    } else {
        let phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            messages.push({ pre: 'Please Enter', highlight: ' a valid phone number', color: 'orange' });
        }
    }

    // ── 4. PASSWORD ──────────────────────────────────────────────
    if (password === '') {
        messages.push({ pre: 'Please Enter ', highlight: 'Password', color: 'red' });
    } else {
        // >8 chars + at least 1 uppercase, 1 lowercase, 1 number, 1 special char (bonus point)
        let longEnough = password.length > 8;
        let hasUpper   = /[A-Z]/.test(password);
        let hasLower   = /[a-z]/.test(password);
        let hasNumber  = /[0-9]/.test(password);
        let hasSpecial = /[^a-zA-Z0-9_]/.test(password);

        if (!longEnough || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
            messages.push({ pre: 'Please Enter', highlight: ' a valid password', color: 'orange' });
        }
    }

    // ── 6. GENDER ────────────────────────────────────────────────
    if (!genderSelected) {
        messages.push({ pre: 'Please Select ', highlight: 'Gender', color: 'red' });
    }

    // ── 7. AGE GROUP ─────────────────────────────────────────────
    if (ageGroup === '') {
        messages.push({ pre: 'Please Select ', highlight: 'Age Group', color: 'red' });
    }

    // ── SHOW ERRORS IF ANY ────────────────────────────────────────
    if (messages.length > 0) {
        errorBox.style.display = 'block';
        messages.forEach(function(msg) {
            let p = document.createElement('p');
            p.style.margin = '6px 0';
            p.style.fontSize = '15px';

            let span = document.createElement('span');
            span.textContent = msg.pre;

            let strong = document.createElement('strong');
            strong.textContent = msg.highlight;
            strong.style.color = msg.color;

            p.appendChild(span);
            p.appendChild(strong);
            errorBox.appendChild(p);
        });
        return; // stop — don't check password match yet
    }

    // ── PASSWORD MATCH (only if all fields valid) ─────────────────
    if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
    }

    // ── ALL VALID: redirect to index ──────────────────────────────
    window.location.href = 'index.html';
}

function clearForm() {
    document.getElementById('username').value        = '';
    document.getElementById('email').value           = '';
    document.getElementById('phone').value           = '';
    document.getElementById('password').value        = '';
    document.getElementById('confirmPassword').value = '';

    // Clear radio buttons
    document.querySelectorAll('input[name="gender"]').forEach(function(r) {
        r.checked = false;
    });

    // Reset dropdown
    document.getElementById('ageGroup').value = '';

    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(function(c) {
        c.checked = false;
    });

    // Remove all warnings per assignment spec (page 4)
    let errorBox = document.getElementById('error-box');
    errorBox.innerHTML = '';
    errorBox.style.display = 'none';
}
