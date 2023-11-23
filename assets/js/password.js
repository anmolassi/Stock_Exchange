const passwordChecker=document.getElementsByClassName('password-conditions');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirm_password');
const warning=document.getElementById('warning');
var firstName = document.getElementById("first_name");
var lastName = document.getElementById("last_name");
let symbol=0;
let number=0;
let capital=0;
let length8=0;
let matchDone=0;
let emailexists=1;
let symbols=/^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*]).{1,}$/;
let capitals=/^(?=.*[A-Z]).{1,}$/;
let numbers=/^(?=.*\d).{1,}$/;
var validRegexName = /^[a-zA-Z]+$/;
var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const registerBtn = document.getElementById("registerMe");
var email = document.getElementById("email");
var invalidEmail = document.getElementById("invalid_email");
var validEmail = document.getElementById("valid_email");
var validEmailExists = document.getElementById("valid_email_exists");
password.addEventListener('keyup',function(event){
    let str=event.target.value;
    if(str.length>=8){
        passwordChecker[0].style.color='rgb(88, 233, 44)';
        length8=1;
    }else{
        passwordChecker[0].style.color= 'rgb(233, 44, 44)';
        length8=0;
    }
    if(str.match(symbols)){
        passwordChecker[1].style.color='rgb(88, 233, 44)';
        symbol=1;
    }else{
        passwordChecker[1].style.color= 'rgb(233, 44, 44)';
        symbol=0;
    }
    if(new RegExp(numbers).test(str)){
        passwordChecker[2].style.color='rgb(88, 233, 44)';
        number=1;
    }else{
        passwordChecker[2].style.color= 'rgb(233, 44, 44)';
        number=0;
    }
    if(new RegExp(capitals).test(str)){
        passwordChecker[3].style.color='rgb(88, 233, 44)';
        capital=1;
    }else{
        passwordChecker[3].style.color= 'rgb(233, 44, 44)';
        capital=0;
    }
    if(password.value==confirmPassword.value&&password.value!=''){
        passwordChecker[4].style.color='rgb(88, 233, 44)';
        matchDone=1;
    }else{
        passwordChecker[4].style.color= 'rgb(233, 44, 44)';
        matchDone=0;
    }
    if(symbol==1&&number==1&&capital==1&&length8==1){
        password.style.border = "var(--clr-neon-gr) 0.125em solid";
        // registerBtn.disabled=false;
    }else{
        password.style.border = "var(--clr-neon-rd) 0.125em solid";
        confirmPassword.style.border = "var(--clr-neon-rd) 0.125em solid";
        // registerBtn.disabled=true;
    }
    if(symbol==1&&number==1&&capital==1&&matchDone==1&&length8==1){
        confirmPassword.style.border = "var(--clr-neon-gr) 0.125em solid";
        // registerBtn.disabled=false;
    }else{
        confirmPassword.style.border = "var(--clr-neon-rd) 0.125em solid";
        // registerBtn.disabled=true;
    }
})
confirmPassword.addEventListener('keyup',function(event){
    if(password.value==confirmPassword.value&&password.value!=''){
        passwordChecker[4].style.color='rgb(88, 233, 44)';
        matchDone=1;
    }else{
        passwordChecker[4].style.color= 'rgb(233, 44, 44)';
        matchDone=0;
    }
    if(symbol==1&&number==1&&capital==1&&matchDone==1&&length8==1){
        confirmPassword.style.border = "var(--clr-neon-gr) 0.125em solid";
        // registerBtn.disabled=false;
    }else{
        confirmPassword.style.border = "var(--clr-neon-rd) 0.125em solid";
        // registerBtn.disabled=true;
    }
})

email.addEventListener("keyup", function () {
    if (email.value.match(validRegex)) {
      $.ajax({
        //   url: `https://anmol-assi-puzzle.azurewebsites.net/emailCheck/${email.value}`,
          url: `https://stock-exchange.azurewebsites.net/emailCheck/${email.value}`,
          type: "get",
          beforeSend: function () {
            
          },
          success: async function (data) {
              if(data.email==1){
                  invalidEmail.style.display="none";
                  validEmailExists.style.display="none";
                  validEmail.style.display="block";
                  email.style.border="var(--clr-neon-gr) 0.125em solid";
                  emailexists=0;
                  //Seems good
              }else{
                  invalidEmail.style.display="none";
                  validEmail.style.display="none";
                  validEmailExists.style.display="block";
                  email.style.border="var(--clr-neon-rd) 0.125em solid";
                  emailexists=1;
                  //email exsists
              }
          },
        });
    } else {
      validEmailExists.style.display="none";
      validEmail.style.display="none";
      invalidEmail.style.display="block";
      email.style.border="var(--clr-neon-rd) 0.125em solid";
      emailexists=1;
    }
  });
registerBtn.addEventListener("click", function (event) {
    if (!(email.value.match(validRegex) &&firstName.value.match(validRegexName) &&lastName.value.match(validRegexName) &&password.value.match(symbols) &&password.value.match(capitals) &&password.value.match(numbers) &&password.value.length >= 8 &&password.value == confirmPassword.value&& emailexists==0)) {
      event.preventDefault();
      warning.style.display = "block";
      setTimeout(function () {
        warning.style.display = "none";
      }, 5000);
    }
  });
// regexPattern = /^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])(?=.*[a-zA-Z])(?=.*\d).{8,12}$/;
// Here’s the breakdown of the different parts of the above pattern:

// “^” represents the start of the string or pattern.
// “(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])” matches any string that contains at least one special character, listed inside the square brackets.
// “(?=.*[a-zA-Z])” indicates that the password must contain at least one letter (uppercase or lowercase).
// “(?=.*\d)” denotes that the string/password contains at least one digit.
// “.{8,12}” tells that the password must be 8 to 12 characters in length.
// “$” denotes the end of the pattern string.