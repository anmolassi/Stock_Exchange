var reset = document.getElementById("reset");
var email = document.getElementById("email");
reset.style.pointerEvents = "none";
reset.style.cursor = "default";
var validRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
email.addEventListener("keyup", function () {
  if (email.value.match(validRegex)) {
    reset.style.pointerEvents = "auto";
    reset.style.cursor = "pointer";
    reset.href = `/forgotPassword/${email.value}`;
    console.log(reset.href);
  } else {
    reset.style.pointerEvents = "none";
    reset.style.cursor = "default";
  }
});
