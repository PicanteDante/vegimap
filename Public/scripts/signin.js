

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

const register_form = document.getElementById("register-form");
register_form.addEventListener("submit", e => {
  e.preventDefault();  // prevent form from submitting
  
  // get form data
  let username = document.getElementById("register-form-username").value;
  let email = document.getElementById("register-form-email").value;
  let password = document.getElementById("register-form-password").value;
  let confirm_password = document.getElementById("register-form-confirm-password").value;
  
  let register_validation_notice = document.getElementById("register-validation-notice")

  // validate form data
  validate_register_form(username, email, password, confirm_password)
  .then(result => {
    if (result.valid) {
      // result.token contains user_id
      // set token in cookies and redirect to home page
      document.cookie = "user_token=" + result.token;
      window.location.href = "/";
    } else {
      // display error message
      register_validation_notice.innerHTML = result.message;
    }
  });
});

const login_form = document.getElementById("login-form");
login_form.addEventListener("submit", e => {
  e.preventDefault();  // prevent form from submitting

  // get form data
  let email = document.getElementById("login-form-email").value;
  let password = document.getElementById("login-form-password").value;

  let login_validation_notice = document.getElementById("login-validation-notice")
  // validate form data
  validate_login_form(email, password)
  .then(result => {
    if (result.valid) {
      // result.token contains user_id
      // set token in cookies and redirect to home page
      document.cookie = "user_token=" + result.token;
      window.location.href = "/";
    } else {
      // display error message
      login_validation_notice.innerHTML = result.message;
    }
  });
});
  
async function validate_register_form (username, email, password, confirm_password) {
  // make sure fields are not empty
  if(username === "" || email === "" || password === "" || confirm_password === ""){
    return {
      valid:false,
      message:"Please fill in all the fields"
    };
  }

  // make sure password and confirm password match
  if (password !== confirm_password) {
    return {
      valid:false,
      message:"Passwords do not match"
    };
  }

  // make sure password is at least 8 characters
  if (password.length < 8) {
    return {
      valid:false,
      message:"Password must be at least 8 characters"
    };
  }

  // make sure username is at least 3 characters
  if (username.length < 3) {
    return {
      valid:false,
      message:"Username must be at least 3 characters"
    };
  }

  // make sure username is at most 20 characters
  if (username.length > 20) {
    return {
      valid:false,
      message:"Username must be at most 20 characters"
    };
  }

  // now send to server to check if valid
  let response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  }).then(async (response) => {
    return [response.ok, await response.json()];
  }).then(result => {
    if (result[0]) {
      return {
        valid: true,
        token: result[1].token
      };
    } else {
      return {
        valid: false,
        message: result[1].message
      };
    }
  });

  return response;
}

async function validate_login_form (email, password) {
  // make sure fields are not empty
  if(email === "" || password === ""){
    return {
      valid:false,
      message:"Please fill in all the fields"
    };
  }
  
  // now send to server to check if valid
  return await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(async (response) => {
    return [response.ok, await response.json()];
  }).then(result => {
    if (result[0]) {
      return {
        valid: true,
        token: result[1].token
      };
    } else {
      return {
        valid: false,
        message: result[1].message
      };
    }
  });
}