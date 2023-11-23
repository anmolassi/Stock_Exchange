var email = document.getElementById("email");
var invalidEmail = document.getElementById("invalid_email");
var validEmail = document.getElementById("valid_email");
var validEmailExists = document.getElementById("valid_email_exists");
var getLink=document.getElementById('login');
getLink.disabled=false;
// var validRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var validRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
email.addEventListener("input", function () {
  if (email.value.match(validRegex)) {
    $.ajax({
        url: `https://stock-exchange.azurewebsites.net/emailCheck/${email.value}`,
        // url: `http://localhost:5000/emailCheck/${email.value}`,
        type: "get",
        beforeSend: function () {
            getLink.disabled=true;
        },
        success: async function (data) {
            if(data.email==0){
                getLink.disabled=false;
                invalidEmail.style.display="none";
                validEmailExists.style.display="none";
                validEmail.style.display="block";
                email.style.border="var(--clr-neon-gr) 0.125em solid";
                //Seems good
            }else{
                getLink.disabled=true;
                invalidEmail.style.display="none";
                validEmail.style.display="none";
                validEmailExists.style.display="block";
                email.style.border="var(--clr-neon-rd) 0.125em solid";
                //email exsists
            }
        },
      });
  } else {
    getLink.disabled=true;
    validEmailExists.style.display="none";
    validEmail.style.display="none";
    invalidEmail.style.display="block";
    email.style.border="var(--clr-neon-rd) 0.125em solid";
  }
});
