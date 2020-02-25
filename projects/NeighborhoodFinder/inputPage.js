let categories = ["Rent", "Safety", "Transportation", "Schools", "Population", "Diversity", "Food"];
let cats = [false, false, false, false, false, false, false];
let buttonsClicked = 0;
setup();

function setup() {
  document.querySelectorAll('.buttonImg').forEach((button) => {
    button.addEventListener("click", toggleButtonColor);
  });
}

function toggleButtonColor() {
  let num = parseInt(this.src.substring(this.src.length-5));

  if (this.src.endsWith(`unselected${num}.png`)) {
    this.src = this.src.replace("unselected", "selected");
    ++buttonsClicked;
  }
  else {
    this.src = this.src.replace("selected", "unselected");
    --buttonsClicked;
  }

  cats[num] = !cats[num];
  showButton();
}

function showButton() {
  if (canShowButton()) {
  document.getElementById("button").style.display = "block";
  } else {
  document.getElementById("button").style.display = "none";
  }
}

function canShowButton() {
  return buttonsClicked === 3;
}

function calculateResult() {
  let category1 = "";
  let category2 = "";
  let category3 = "";

  for (let i = 0; i < cats.length; ++i) {
    if (cats[i]) {
      if (!category1) {
        category1 = categories[i];
      }
      else if (!category2) {
        category2 = categories[i];
      }
      else {
        category3 = categories[i];
        break;
      }
    }
  }

  return calcTopNeighborhood(category1, category2, category3);
}
