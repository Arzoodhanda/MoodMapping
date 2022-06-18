const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector("#btn");
const cancelBtn = document.querySelector("#cancel");
menuBtn.onclick = () => {
  navbar.classList.add("show");
  menuBtn.classList.add("hide");
  body.classList.add("disabled");
};
cancelBtn.onclick = () => {
  body.classList.remove("disabled");
  navbar.classList.remove("show");
  menuBtn.classList.remove("hide");
};
window.onscroll = () => {
  this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
};

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

// window.onscroll = function () {
//   myFunction();
// };

// var navbar = document.getElementsByClassName("navbar");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky");
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
