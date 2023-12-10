// Define TxtType constructor function
const TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

// Define the tick method for TxtType prototype
TxtType.prototype.tick = function () {
  // Get the current rotation index
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  // Update the text based on whether deleting or typing
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Set the text content of the element
  this.el.innerHTML =
    '<span class="wrap">' + "an aspiring " + this.txt + "</span>";

  // Adjust the delta time for a typewriter effect
  const that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  // Update state and schedule the next tick
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// Execute when the window has loaded
window.onload = function () {
  // Get elements with the class "typewrite"
  const elements = document.getElementsByClassName("typewrite");

  // Iterate through each element
  for (let i = 0; i < elements.length; i++) {
    // Get the data attributes for rotation and period
    const toRotate = elements[i].getAttribute("data-type");
    const period = elements[i].getAttribute("data-period");

    // Create TxtType instance if rotation data is present
    if (toRotate) {
      try {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }
  }

  // INJECT CSS for typewriter effect
  const css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
