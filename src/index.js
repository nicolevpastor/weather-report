let temp = 75;

const increaseTemp = document.getElementById("increase_temp");
const decreaseTemp = document.getElementById("decrease_temp");

document.getElementById("numeric-temp").textContent = `${temp}°F`;

increaseTemp.addEventListener("click", () => {
  temp += 1;
  document.getElementById("numeric-temp").textContent = `${temp}°F`;
  changeTextColor(temp);
});

decreaseTemp.addEventListener("click", () => {
  temp -= 1;
  document.getElementById("numeric-temp").textContent = `${temp}°F`;
  changeTextColor(temp);
});

function changeTextColor(temperature) {
  if (temperature > 80) {
    document.getElementById("numeric-temp").style.color = "red";
    document.getElementById('numeric-temp').style.backgroundColor = 'red';
  } else if (temperature > 69) {
    document.getElementById("numeric-temp").style.color = "orange";
    document.getElementById('numeric-temp').style.backgroundColor = 'orange';
  } else if (temperature > 59) {
    document.getElementById("numeric-temp").style.color = "yellow";
    document.getElementById('numeric-temp').style.backgroundColor = 'yellow';
  } else if (temperature > 49) {
    document.getElementById("numeric-temp").style.color = "green";
    document.getElementById('numeric-temp').style.backgroundColor = 'green';
  } else {
    document.getElementById("numeric-temp").style.color = "teal";
    document.getElementById('numeric-temp').style.backgroundColor = 'teal';
  } // does this work lol
  // yes it does haha
  //only the text color changes, not the background yet 
  //yay! okay so we can add background color too
}
