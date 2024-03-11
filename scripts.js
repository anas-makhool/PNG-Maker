// Cards
let addCard = document.querySelector("#addCard");
let displayCard = document.querySelector("#displayCard");
let loadingCard = document.querySelector("#loadingCard");
let downloadCard = document.querySelector("#downloadCard");
// Inputs & Button
let fileInput = document.querySelector("#fileInput");
let uploadAnother = document.querySelector("#uploadAnother");
let startBtn = document.querySelector("#startBtn");
// images
let imageStart = document.querySelector("#display-img");
let imageBefore = document.querySelector(".image-before");
let imageAfter = document.querySelector(".image-after");
// link
let downloadHref = document.querySelector("#downloadHref");

const reader = new FileReader();
const formData = new FormData();
let file = null;

const api = "https://api.remove.bg/v1.0/removebg";
const apiKey = "B4hrcCT2NoiQpCPyEkRNGzXr";

const activeScreen = (screen) => {
  addCard.style.display = "none";
  displayCard.style.display = "none";
  loadingCard.style.display = "none";
  downloadCard.style.display = "none";
  screen.style.display = "flex";
};

activeScreen(addCard);

fileInput.addEventListener("input", () => {
  file = fileInput.files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    imageStart.src = reader.result;
  };
  activeScreen(displayCard);
});

startBtn.addEventListener("click", () => {
  formData.append("image_file", file); // adding file to form data (BODY)
  activeScreen(loadingCard);
  fetch(api, {
    method: "POST",
    headers: {
      "X-Api-key": apiKey,
    },
    body: formData,
  })
    .then((res) => res.blob()) // as like file
    .then((data) => {
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        imageBefore.src = imageStart.src;
        imageAfter.src = reader.result;
        downloadHref.setAttribute("href", reader.result);
      };
      activeScreen(downloadCard);
    });
});

uploadAnother.addEventListener("click", () => {
  // activeScreen(addCard); // todo
  window.location.reload();
});

// todo : If the user uploads a file other than images ??

/*
learned :
1- how can I navigate between other screens
2- how can I upload images and read it using FileReader() Constructor
3- how can I POST data as file on API using FormData() Constructor
4- the response is not necessary to return as json (blob)
*/
