"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};
const { movies } = movieDB;

const poromoAdv = document.querySelector(".promo__adv");
const promoGenre = document.querySelector(".promo__genre");
const promoBg = document.querySelector(".promo__bg");
const promoInteractiveList = document.querySelector(".promo__interactive-list");

const advs = poromoAdv.querySelectorAll("img");

const form = document.querySelector(".add");
const input = form.querySelector(".adding__input");
const checkbox = form.querySelector("[type='checkbox']");

const deleteAdv = (arr) => {
  arr.forEach((adv) => {
    adv.remove();
  });
};

deleteAdv(advs);

const makeChanges = () => {
  promoGenre.textContent = "драма".toUpperCase();
  promoBg.style.backgroundImage = 'url("../img/bg.jpg")';
  promoInteractiveList.innerHTML = "";
};

makeChanges();

function renderMovies(movies, parent) {
  parent.innerHTML = movies
    .sort()
    .map((movie, index) => {
      return `<li class="promo__interactive-item">
          ${index + 1}) ${movie}
          <div class="delete"></div>
          </li>`;
    })
    .join("");

  setEventListenersOnDelete();
}

renderMovies(movies, promoInteractiveList);

function setEventListenersOnDelete() {
  const deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener("click", (e) => {
      movies.splice(i, 1);
      renderMovies(movies, promoInteractiveList);
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userData = input.value;

  if (userData) {
    if (userData.length > 21) {
      userData = `${userData.slice(0, 22)}...`;
    }

    if (checkbox.checked) {
      console.log("Добавляем любимый фильм");
    }

    movies.push(userData);
    renderMovies(movies, promoInteractiveList);
  }

  e.target.reset();
});
