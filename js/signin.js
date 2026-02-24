function preventSpaces(event) {
  if (event.key === ' ') {
    event.preventDefault();
    return false;
  }
  return true;
}

function allowOnlyNumbers(event) {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) return true;
  // If key is not a number, prevent it
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
    return false;
  }
  return true;
}

// allow lowercase, numbers, and underscore
function allowUsernameChars(event) {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) return true;

  if (event.key === ' ') {
    event.preventDefault();
    return false;
  }

  // Only lowercase a-z, 0-9, and underscore
  if (!/^[a-z0-9_]$/.test(event.key)) {
    event.preventDefault();
    return false;
  }
  return true;
}

function allowOnlyLetters(event) {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) return true;
  // If key is not a letter, prevent it
  if (!/^[A-Za-z]$/.test(event.key)) {
    event.preventDefault();
    return false;
  }
  return true;
}

function preventNonLetterPaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  // Remove anything that is NOT a letter (A-Z, a-z)
  event.target.value += paste.replace(/[^A-Za-z]/g, '');
}

// --- 2. PASTE PROTECTION ---

function preventSpacePaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  event.target.value += paste.replace(/\s/g, '');
}

function preventYearPaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  // Remove non-numbers
  let clean = paste.replace(/[^0-9]/g, '');

  // Enforce max 4 chars total
  const currentVal = event.target.value;
  const remaining = 4 - currentVal.length;

  if (remaining > 0) {
    event.target.value += clean.slice(0, remaining);
  }
}

function preventNonNumericPaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  event.target.value += paste.replace(/[^0-9]/g, '');
}

function preventInvalidUsernamePaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  // Remove anything that is NOT lowercase, number, or underscore
  event.target.value += paste.replace(/[^a-z0-9_]/g, '');
}

// College Name: Letters & Spaces (No leading space)
function allowCollegeName(event) {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) return true;

  // Prevent leading space
  if (event.key === ' ' && event.target.selectionStart === 0) {
    event.preventDefault();
    return false;
  }

  // Allow letters and spaces
  if (!/^[A-Za-z\s]$/.test(event.key)) {
    event.preventDefault();
    return false;
  }
  return true;
}

function preventInvalidCollegePaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  // Remove invalid chars
  let clean = paste.replace(/[^A-Za-z\s]/g, '');
  // Trim leading space if inserting at start
  if (event.target.selectionStart === 0) {
    clean = clean.replace(/^\s+/, '');
  }
  event.target.value += clean;
}

// --- 3. DYNAMIC UI LOGIC (STUDENT TOGGLE) ---

const studentRadios = document.querySelectorAll('input[name="student"]');
const academicSection = document.getElementById('academicSection');
const academicInputs = academicSection.querySelectorAll('input, select');

studentRadios.forEach(radio => {
  radio.addEventListener('change', function () {
    if (this.value === 'yes') {
      academicSection.style.display = 'block';
      // Add required to academic fields when visible
      academicInputs.forEach(input => input.required = true);
    } else {
      academicSection.style.display = 'none';
      // Remove required when hidden so form can submit
      academicInputs.forEach(input => {
        input.required = false;
        input.value = ""; // Clear values if user toggles off
      });
    }
  });
});

// --- 4. FINAL FORM SUBMISSION ---

function showError(id, message) {
  const errorDiv = document.getElementById(id);
  if (errorDiv) {
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
  }
}

function clearErrors() {
  const errorIds = ['error-username', 'error-email', 'error-password', 'error-confirm', 'error-dob'];
  errorIds.forEach(id => {
    const errorDiv = document.getElementById(id);
    if (errorDiv) {
      errorDiv.innerText = '';
      errorDiv.style.display = 'none';
    }
  });
}

document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Stop actual submission for this demo
  clearErrors();

  // Bootstrap Validation
  if (!this.checkValidity()) {
    event.stopPropagation();
    this.classList.add('was-validated');
    return;
  }

  let isValid = true;

  // Username Validation
  const username = document.getElementById('username').value;
  const usernameRegex = /^(?=.*[a-z])(?=.*\d)[a-z0-9_]{6,}$/;

  if (!usernameRegex.test(username)) {
    showError('error-username', "Username must be at least 6 characters and contain at least one lowercase letter and one number.");
    isValid = false;
  }

  // Password Validation
  const pass = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;

  // Check strict password complexity
  const strongPasswordBox = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!strongPasswordBox.test(pass)) {
    showError('error-password', "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.");
    isValid = false;
  }

  // Check matching
  if (pass !== confirm) {
    showError('error-confirm', "Passwords do not match!");
    isValid = false;
  }

  // Age Validation
  const dob = document.getElementById('dob').value;
  if (dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    // Subtract 1 if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 15) {
      showError('error-dob', "You must be at least 15 years old to register.");
      isValid = false;
    }
  }

  // Email Validation
  const email = document.getElementById('email').value;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (!emailRegex.test(email)) {
    showError('error-email', "Please enter a valid email address (e.g., user@example.com).");
    isValid = false;
  }

  if (isValid) {
    alert("Registration Successful!");
    window.location.href = "index.html";
  }
});

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === 'password';

  input.type = isPassword ? 'text' : 'password';

  // Toggle Icon
  if (isPassword) {
    // Show password (replace with open eye)
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Hide password');
  } else {
    // Hide password (replace with slashed eye)
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
        <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Show password');
  }
}