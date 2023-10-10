import validator from "validator";

class Form {
  constructor() {
    // DOM manipulation
    // username
    this.username = document.getElementById("username");
    this.usernameFailureIcon = document.getElementById("username-failure-icon");
    this.usernameSuccessIcon = document.getElementById("username-success-icon");
    this.usernameErrorDiv = document.getElementById("username-error-div");

    // email
    this.email = document.getElementById("email");
    this.emailFailureIcon = document.getElementById("email-failure-icon");
    this.emailSuccessIcon = document.getElementById("email-success-icon");
    this.emailErrorDiv = document.getElementById("email-error-div");
    // password
    this.password = document.getElementById("password");
    this.passwordFailureIcon = document.getElementById("password-failure-icon");
    this.passwordSuccessIcon = document.getElementById("password-success-icon");
    this.passwordErrorDiv = document.getElementById("password-error-div");

    this.form = document.getElementById("form");
    this.data = {};

    //
    this.handleEvents();
  }

  // Events handling
  handleEvents() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.data = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.validateForm(this.data);
    });
  }

  // Define functionality
  cleanUp(data) {
    // Prevent the user from sending something else than a String
    if (typeof data.username != "string") data.username = "";
    if (typeof data.email != "string") data.email = "";
    if (typeof data.password != "string") data.password = "";

    // Prevent the user from inserting extra properties and
    this.data = {
      username: this.data.username.trim().toLowerCase(),
      email: this.data.email.trim().toLowerCase(),
      password: this.data.password,
    };
  }

  validateForm(data) {
    this.cleanUp(data);

    // username validation
    if (data.username == "") {
      this.usernameErrorDiv.innerHTML = "Username cannot be empty.";
      this.sinalizeError(this.username, this.usernameFailureIcon, this.usernameSuccessIcon);
    } else if (data.username != "" && !validator.isAlphanumeric(data.username)) {
      this.usernameErrorDiv.innerHTML = "Username can only contain letters and numbers.";
      this.sinalizeError(this.username, this.usernameFailureIcon, this.usernameSuccessIcon);
    } else if (data.username.length > 0 && data.username.length < 3) {
      this.usernameErrorDiv.innerHTML = "Username must be at least 3 characters.";
      this.sinalizeError(this.username, this.usernameFailureIcon, this.usernameSuccessIcon);
    } else if (data.username.length > 30) {
      this.usernameErrorDiv.innerHTML = "Username cannot exceed 30 characters.";
      this.sinalizeError(this.username, this.usernameFailureIcon, this.usernameSuccessIcon);
    } else {
      this.usernameErrorDiv.innerHTML = "";
      this.sinalizeSuccess(this.username, this.usernameFailureIcon, this.usernameSuccessIcon);
    }
    // email validation
    if (data.email == "") {
      this.emailErrorDiv.innerHTML = "Email cannot be empty.";
      this.sinalizeError(this.email, this.emailFailureIcon, this.emailSuccessIcon);
    } else if (data.email != "" && !validator.isEmail(data.email)) {
      this.emailErrorDiv.innerHTML = "You must provide a valid email.";
      this.sinalizeError(this.email, this.emailFailureIcon, this.emailSuccessIcon);
    } else {
      this.emailErrorDiv.innerHTML = "";
      this.sinalizeSuccess(this.email, this.emailFailureIcon, this.emailSuccessIcon);
    }

    // password validation
    if (data.password == "") {
      this.passwordErrorDiv.innerHTML = "Password cannot be empty.";
      this.sinalizeError(this.password, this.passwordFailureIcon, this.passwordSuccessIcon);
    } else if (data.password.length > 0 && data.password.length < 8) {
      this.passwordErrorDiv.innerHTML = "Password must be at least 8 characters.";
      this.sinalizeError(this.password, this.passwordFailureIcon, this.passwordSuccessIcon);
    } else if (data.password.length > 30) {
      this.passwordErrorDiv.innerHTML = "Password cannot exceed 30 characters.";
      this.sinalizeError(this.password, this.passwordFailureIcon, this.passwordSuccessIcon);
    } else {
      this.passwordErrorDiv.innerHTML = "";
      this.sinalizeSuccess(this.password, this.passwordFailureIcon, this.passwordSuccessIcon);
    }
  }

  sinalizeError(inputField, failureIcon, successIcon) {
    inputField.style.border = "2px solid red";
    failureIcon.style.opacity = "1";
    successIcon.style.opacity = "0";
  }

  sinalizeSuccess(inputField, failureIcon, successIcon) {
    inputField.style.border = "2px solid green";
    failureIcon.style.opacity = "0";
    successIcon.style.opacity = "1";
  }
}

export default Form;
