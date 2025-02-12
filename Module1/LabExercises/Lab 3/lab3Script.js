function changeColumn1() {
  event.preventDefault(); // this seems to be required when using form... originally I used textarea outside without form but this seems to be a poor practice?
  // change the background color
  document.getElementById("column1").style.backgroundColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  // change the heading text
  document.getElementById("heading1").innerHTML = 
  document.getElementById("text1").value;
}

function changeColumn2() {
  event.preventDefault(); // this seems to be required when using form... originally I used textarea without form but this seems to be a poor practice?
  // change the background color
  document.getElementById("column2").style.backgroundColor =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  // change the heading text
  document.getElementById("heading2").innerHTML = 
  document.getElementById("text2").value;
}

document.addEventListener("DOMContentLoaded", function () { // added this for enter to call the same functions as the buttons
    // Attach event listener to detect Enter key in textarea
    document
      .getElementById("text1")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent new line
          changeColumn1();
        }
      });
  
    document
      .getElementById("text2")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent new line
          changeColumn2();
        }
      });
  });