const formTitle = document.getElementById('form-title');
const confirmedPasswordContainer = document.getElementById('confirmed-password-container');
const submitButton = document.getElementById('submit');
const toggleLink = document.getElementById('toggle-link');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

//change from login to signup or vice versa
function toggleAuth() {
  const isLoginForm = formTitle.innerText === 'Login';
  formTitle.textContent = isLoginForm ? "Sign up" : "Login";
  confirmedPasswordContainer.style.display = isLoginForm ? "block" : "none";
  submitButton.textContent = isLoginForm ? "Sign up" : "Login";
  toggleLink.textContent = isLoginForm ? "Sign up" : "Login";
}

const users = []; //assign default users array

//check if username and password exist in array
function userLogin(username, password) {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    alert("Login Success!");
  } else {
    alert("User not found. Please sign up first.");
  }
}

//user signup
function userSignup(username, password, isPasswordMatch) {
  //check if password and confirm password match
  if (isPasswordMatch) {
    //check if user already exist & if password meets all requirement
    const isUserExist = users.find(user => user.username === username);
    const validPassword = validatePassword(password);

    if (!isUserExist) {
      if (validPassword) {
        users.push({ username: username, password: password });
        alert("Sign up Success!");
        toggleAuth(); //after succefully signup, toggle to login

      } else {
        alert("Password must contain at least: \n-8 characters \n-one uppercase letter an lowercase letter \n-one number \n-one special character");

      }
    } else {
      alert('User already exist.');
    }
  } else {
    alert("Password do not match.");

  }
}

function validatePassword(password) {
  // Define regular expressions for each requirement
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  // Check if all conditions are met
  const hasLowercase = regexLowercase.test(password);
  const hasUppercase = regexUppercase.test(password);
  const hasNumber = regexNumber.test(password);
  const hasSpecial = regexSpecial.test(password);
  const isLong = password.length >= 8;

  // Ensure all conditions are true
  const isValid = hasLowercase && hasUppercase && hasNumber && hasSpecial && isLong;

  return isValid;
}

function handleSubmit() {
  //retrieve username and password
  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value === password; //check if match
  const isLoginForm = formTitle.innerText === 'Login'; //check if login or signup

  if (username && password) { //check if there is any empty fields
    if (isLoginForm) {
      userLogin(username, password);
    } else {
      userSignup(username, password, confirmPassword)
    }
  } else {
    alert("Please fill in all fields.");
  }
} 