"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  //Features feature is true
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // If feature is (now) turned on:
    target.classList.add("chosen");
    // - mark target as chosen (add class "chosen")
    // - un-hide the feature-layer(s) in the #product-preview;
    document.querySelector(`img[data-feature=${feature}]`).classList.remove("hide");

    //create element
    const returnedFeature = createFeatureElement(feature);
    document.querySelector("#selected ul").append(returnedFeature);

    // - create FLIP-animation to animate featureElement from img in target, to
    //1. First: find the start-position
    const start = target.getBoundingClientRect();
    //2. Last: find the end position
    const end = returnedFeature.getBoundingClientRect();
    //3. Invert: translate the element to the start-position
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    //Declaration no need for var
    returnedFeature.style.setProperty("--diffX", diffX);
    returnedFeature.style.setProperty("--diffY", diffY);

    //4. Play: animate the element to translate(0,0)
    returnedFeature.classList.add("animate-feature-in");
    //   its intended position. Do it with normal animation or transition class!

    // TODO: More code
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);

    // TODO: More code
    // Else - if the feature (became) turned off:
    // - no longer mark target as chosen
    target.classList.remove("chosen");
    // - hide the feature-layer(s) in the #product-preview
    document.querySelector(`img[data-feature=${feature}]`).classList.add("hide");
    // - find the existing featureElement in #selected ul
    const existingElement = document.querySelector(`#selected ul li[data-feature=${feature}]`);
    // - create FLIP-animation to animate featureElement to img in target
    //1. First: find the start-position
    const start = target.getBoundingClientRect();
    //2. Last: find the end position
    const end = existingElement.getBoundingClientRect();
    //3. Invert: translate the element to the start-position
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    //Declaration no need for var
    existingElement.style.setProperty("--diffX", diffX);
    existingElement.style.setProperty("--diffY", diffY);

    //4. Play: animate the element to translate(0,0)
    existingElement.classList.add("animate-feature-out");
    // - when animation is complete, remove featureElement from the DOM
    existingElement.addEventListener("animationend", () => {
      existingElement.remove();
    });
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
