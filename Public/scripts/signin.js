//https://www.codinglabweb.com/2022/06/login-signup-form-html-css-javascript.html
const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    
    pwFields.forEach(password => {
        if(password.type === "password"){
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
    })
  })
})      

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  })
})

const signup_form = document.getElementById("signup-form");
signup_form.addEventListener("submit", e => {
  e.preventDefault();
  let username = document.getElementById("signup-form-username").value;
  let email = document.getElementById("signup-form-email").value;
  let password = document.getElementById("signup-form-password").value;
  let confirm_password = document.getElementById("signup-form-confirm-password").value;

  validate_signup_form(username, email, password, confirm_password)
  .then(result => {
    if (result) {
      signup_form.submit();
    } else {
      return;
    }
  });
});

const login_form = document.getElementById("login-form");
login_form.addEventListener("submit", e => {
  e.preventDefault();
  let email = document.getElementById("login-form-email").value;
  let password = document.getElementById("login-form-password").value;

  validate_login_form(email, password)
  .then(result => {
    if (result) {
      login_form.submit();
    } else {
      return;
    }
  });
});

async function validate_login_form (email, password) {
  let validation_notice = document.querySelector("p.form.login.validation-notice");

  // make sure email and password are not empty
  if(email === "" || password === ""){
    validation_notice.innerHTML = "Please fill in all fields";
    return false;
  }
  return true;
}
  
async function validate_signup_form (username, email, password, confirm_password) {
  console.log("validate_signup_form");
  let validation_notice = document.getElementById("signup-validation-notice");

  // make sure fields are not empty
  if(username === "" || email === "" || password === "" || confirm_password === ""){
    validation_notice.innerHTML = "Please fill in all the fields";
    return false;
  }

  // make sure password and confirm password match
  if (password !== confirm_password) {
    validation_notice.innerHTML = "Passwords do not match";
    return false;
  }

  // make sure password is at least 8 characters
  if (password.length < 8) {
    validation_notice.innerHTML = "Password must be at least 8 characters";
    return false;
  }

  // make sure username is at least 3 characters
  if (username.length < 3) {
    validation_notice.innerHTML = "Username must be at least 3 characters";
    return false;
  }

  // make sure username is at most 20 characters
  if (username.length > 20) {
    validation_notice.innerHTML = "Username must be at most 20 characters";
    return false;
  }

  // make sure email is not already in use (use post request with email to check)
  let data = await check_email_and_username(email, username);
  if (data.email_in_use) {
    validation_notice.innerHTML = "Email is already in use";
    return false;
  }
  if (data.username_in_use) {
    validation_notice.innerHTML = "Username is already in use";
    return false;
  }

  return true;
}

async function check_email_and_username (email, username) {
  let response = await fetch("/users/signup/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username
    })
  });
  let data = await response.json();
  return data;
}
