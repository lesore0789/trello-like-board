// Background Changer
const colorarray = ["#B3D9F4", "#B3B6F4", "#F4B3E2", "#B3F4CD", "#F3F4B3"];
const colorbox = document.getElementById("colorbox");

function bgchange(color) {
  document.body.style.background = colorarray[color];
}


colorarray.forEach(function (color, index) {
  let span = document.createElement("span");
  span.style.backgroundColor = color;
  span.addEventListener("click", function () {
      bgchange(index);
  });
  colorbox.appendChild(span);
});
