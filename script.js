let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const ulGamesList = document.getElementById("ul-games-list");
const searchQuery = document.getElementById("search-query");
const actionsBtn = document.getElementById("actions-btn");
const casualsBtn = document.getElementById("casuals-btn");
const fpsBtn = document.getElementById("fps-btn");
const mmosBtn = document.getElementById("mmos-btn");
const rpgsBtn = document.getElementById("rpgs-btn");
const rtsBtn = document.getElementById("rts-btn");
const sportsBtn = document.getElementById("sports-btn");
const ulBestsList = document.getElementById("ul-bests-list");
const Bestlist = document.getElementById("bestlist");
const BestsBtn = document.getElementById("bests-btn");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

async function getGamesList(genre, query) {
  let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?`;
  if (genre) url += `genres=${genre}`;
  if (query) url += `q=${query}`;
  const response = await fetch(url);
  let result = await response.json();
  return result;
}

async function getSingleGame(appId) {
  const res = await fetch(
    `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appId}`
  );
  const result = await res.json();
  return result.data;
}

async function renderSingleGame(appId) {
  const game = await getSingleGame(appId);
  ulGamesList.innerHTML = `
  <div class="showing_game show_detail">
  <div class="title_contain ">
  <div class="title"><b>${game.name}</b></div>
  <div class="price">${game.price}</div>
  </div>
  <div class="img_detail">
  <img src="${game.header_image}" alt="${game.name}">
  <div class="game_details">
  <div class="game_description">English :${game.english} Platforms : ${game.platforms} Categories : ${game.categories} Age appropriate : ${game.required_age} Achievements : ${game.achievements} Positive ratings : ${game.positive_ratings}</div>
  <div class="game_informations">
  <p>RECENT REVIEWS: Mostly Positive</p>
  <p>RELEASE DATE:  ${game.release_date}</p>
  <p>DEVELOPER:  <a href="">${game.developer}</a></p>
  <p>PUBLISHER:  <a href="">${game.developer}</a></p>
  </div>
  </div>
  </div>
  <div class="tags_contain">
  Popular user-defined tags for this product:
  <div class="tags">
    <div class="tag"><a href="">${game.steamspy_tags}</a></div>
    <div class="tag"><a href="">${game.genres}</a></div>
  </div>
  </div>
  </div>
  </div>`;
}

async function renderGamesList(genre, query) {
  const gamesList = await getGamesList(genre, query);
  const data = gamesList.data;
  ulGamesList.innerHTML = "";
  data.forEach((game, index) => {
    const gameLi = document.createElement("li");
    gameLi.innerHTML = `
    <div class="game">
              <img src="${game.header_image}" alt="Game 1">
              <h3>${game.name}</h3>
          </div>`;
    gameLi.addEventListener("click", () => renderSingleGame(game.appid));
    ulGamesList.appendChild(gameLi);
  });
}

async function getBestList() {
  const responseAPI = await fetch(
    `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features`
  );
  const { data } = await responseAPI.json();
  Bestlist.innerHTML = "";
  // console.log("list :>> ", list);
  data.forEach((data) => {
    // console.log('data :>> ', data);
    const bestLi = document.createElement("li");
    bestLi.innerHTML = `
    <div class="showing_game show_detail">
  <div class="title_contain ">
  <div class="title"><b>${game.name}</b></div>
  <div class="price">${game.price}</div>
  </div>
  <div class="img_detail">
  <img src="${game.header_image}" alt="${game.name}">
  <div class="game_details">
  <div class="game_description">English :${game.english} Platforms : ${game.platforms} Categories : ${game.categories} Age appropriate : ${game.required_age} Achievements : ${game.achievements} Positive ratings : ${game.positive_ratings}</div>
  <div class="game_informations">
  <p>RECENT REVIEWS: Mostly Positive</p>
  <p>RELEASE DATE:  ${game.release_date}</p>
  <p>DEVELOPER:  <a href="">${game.developer}</a></p>
  <p>PUBLISHER:  <a href="">${game.developer}</a></p>
  </div>
  </div>
  </div>
  <div class="tags_contain">
  Popular user-defined tags for this product:
  <div class="tags">
    <div class="tag"><a href="">${game.steamspy_tags}</a></div>
    <div class="tag"><a href="">${game.genres}</a></div>
  </div>
  </div>
  </div>
  </div>`;
    Bestlist.appendChild(bestLi);
  });
}

BestsBtn.onclick = getBestList;

searchQuery.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    renderGamesList("", searchQuery.value);
  }
});

renderGamesList();
actionsBtn.addEventListener("click", () => {
  renderGamesList("action");
});
casualsBtn.addEventListener("click", () => {
  renderGamesList("casual");
});
fpsBtn.addEventListener("click", () => {
  renderGamesList("strategy");
});
mmosBtn.addEventListener("click", () => {
  renderGamesList("free to play");
});
rpgsBtn.addEventListener("click", () => {
  renderGamesList("rpg");
});
rtsBtn.addEventListener("click", () => {
  renderGamesList("adventure");
});
rtsBtn.addEventListener("click", () => {
  renderGamesList("adventure");
});
sportsBtn.addEventListener("click", () => {
  renderGamesList("simulation");
});
