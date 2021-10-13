class Form {
  constructor() {
    // DOM manipulation
    this.username = document.getElementById("username");
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.form = document.getElementById("form");
    this.errorMessages = document.getElementsByClassName("error");
    this.successIcons = document.getElementsByClassName("success-icon");
    this.failureIcons = document.getElementsByClassName("failure-icon");
    this.handleEvents();
  }

  // Events handling
  handleEvents() {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      this.validateForm(this.username, 0, "Username cannot be blank.");
      this.validateForm(this.email, 1, "Email cannot be blank.");
      this.validateForm(this.password, 2, "Password cannot be blank.");
    });
  }

  // Define fucntionality
  validateForm(field, index, message) {
    if (field.value.trim() === "") {
      this.errorMessages[index].innerHTML = message;
      this.indicateFailure(field, index);
    } else {
      this.errorMessages[index].innerHTML = "";
      this.indicateSuccess(field, index);
    }
  }

  indicateFailure(field, index) {
    field.style.border = "2px solid red";
    this.failureIcons[index].style.opacity = "1";
    this.indicateSuccessIcons[index].style.opacity = "0";
  }

  success(field, index) {
    field.style.border = "2px solid green";
    this.failureIcons[index].style.opacity = "0";
    this.successIcons[index].style.opacity = "1";
  }
}

export default Form;
