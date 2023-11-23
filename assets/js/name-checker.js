var firstName = document.getElementById("first_name");
var lastName = document.getElementById("last_name");
var validRegexName = /^[a-zA-Z]+$/;
firstName.addEventListener("input", function () {
  if (firstName.value.match(validRegexName)) {
    firstName.style.border = "var(--clr-neon-gr) 0.125em solid";
    //Seems good
  } else {
    firstName.style.border = "var(--clr-neon-rd) 0.125em solid";
  }
});
lastName.addEventListener("input", function () {
  if (lastName.value.match(validRegexName)) {
    lastName.style.border = "var(--clr-neon-gr) 0.125em solid";
    //Seems good
  } else {
    lastName.style.border = "var(--clr-neon-rd) 0.125em solid";
  }
});
