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

// on login form submit (.form.login>.form-content>form)
/*
document.querySelector("form.form.login.form-content").addEventListener("submit", e => {
  e.preventDefault(); //preventing form submit
  let email = document.querySelector("input.").value;
  let password = document.querySelector(".form.login>.form-content>form>.password").value;
});
*/
