const input = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const more = document.querySelector(".more");
const API_KEY = "FtUJxPcYi636VlaZQcKWxj3FgPTJN3KpraIr55RLMP9fp5WRbdU17kH8";
let currentData = [];
let inputData = "";
let page = 1;

// functions
async function generateAPI(api) {
  const data = await fetch(api, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  let photos = await data.json();
  return photos.photos;
}

async function getPhotos() {
  //   console.log("hello");
  const API = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  currentData = await generateAPI(API);
  console.log(currentData);
  generatePhotos();
}

async function generatePhotos() {
  currentData.forEach((element) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img-div");
    const image = `
        <div class="content">
          <p>${element.photographer}</p>
          <a href="${element.src.original}">download.</a>
        </div>
        <img src="${element.src.large}" alt="${element.photographer}"/>
      `;
    imgDiv.innerHTML = image;
    gallery.appendChild(imgDiv);
  });
}

async function getSearchPhotos() {
  clear();
  const API = `https://api.pexels.com/v1/search?query=${inputData}+query&per_page=15&page=1`;
  currentData = await generateAPI(API);
  generatePhotos();
}

async function clear() {
  gallery.innerHTML = "";
  input.value = "";
}

async function showMore() {
  let api;
  if (inputData) {
    api = `https://api.pexels.com/v1/search?query=${inputData}+query&per_page=15&page=${page}`;
  } else {
    api = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  currentData = await generateAPI(api);
  generatePhotos();
}

// event
input.addEventListener("input", function (e) {
  inputData = e.target.value;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getSearchPhotos();
});

more.addEventListener("click", function () {
  page++;
  showMore();
});

getPhotos();

// console.log("Dwdawdn");
