'use strict';




const mainDiv = document.getElementById('root');
const header = mainDiv.appendChild(document.createElement("header"));
header.id = "header";
const headerTitle = header.appendChild(document.createElement("h2"));
headerTitle.innerHTML = "HYF Repositories";
const repoSelector = header.appendChild(document.createElement("select"));
repoSelector.id = "reposelector";
const container = mainDiv.appendChild(document.createElement('div'));
container.id = 'container';
const leftContainer = container.appendChild(document.createElement('div'));
leftContainer.className = "left-div " + "whiteframe";
const rightContainer = container.appendChild(document.createElement('div'));
rightContainer.className = "right-div" + "whiteframe";

const table = leftContainer.appendChild(document.createElement("table"));
table.className = "label";
const tbody = table.appendChild(document.createElement("tbody"));

const repositoryRow = tbody.appendChild(document.createElement("tr"));
const rpData = repositoryRow.appendChild(document.createElement('td'));
const descriptionRow = tbody.appendChild(document.createElement("tr"));
const descriptionData = descriptionRow.appendChild(document.createElement('td'));
const forksRow = tbody.appendChild(document.createElement("tr"));
const forksData = forksRow.appendChild(document.createElement('td'));
const updatedRow = tbody.appendChild(document.createElement("tr"));
const updatedData = updatedRow.appendChild(document.createElement('td'));

const contributorHeader = document.createElement("p");
contributorHeader.className = "contributor-header";
contributorHeader.innerHTML = "Contributors";
const contributorList = document.createElement("ul");
contributorList.className = "contributor-list";
rightContainer.appendChild(contributorHeader);
rightContainer.appendChild(contributorList);


const contributorUrl = "https://api.github.com/repos/HackYourFuture/AngularJS/contributors";
fetch(contributorUrl)
  .then(response => response.json())
  .then(data => {
    contributorList.innerHTML = data.map(
      (item, i) =>
        `<li class="contributor-item" aria-label=${item.login} tabindex="${i}">
  <img src="${item.avatar_url}" height="48" class="contributor-avatar">
  <div class="contributor-data">
    <a href="https://github.com/${item.login}" target="_blank">${item.login}</a>
    <span class="contributor-badge">${item.contributions}</span>
  </div>
  </li>`)
      .join("");

  })
  .catch(error => console.log("ERROR: " + error));

const url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";
fetch(url)
  .then(response => response.json())
  .then(data => {

    const repos = document.getElementById("reposelector");

    data.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

    repos.innerHTML = data.map(
      (repo, i) => `<option value="${i}">${repo.name}</option>`
    ).join("");

    repos.addEventListener("change", function () {
      const i = this.value;
      rpData.innerHTML = 'Repository : ' + `<a href = "https://github.com/HackYourFuture/${data[i].name}" target= "_blank">${data[i].name}</a>`;
      descriptionData.innerHTML = 'Description : ' + data[i].description;
      forksData.innerHTML = "Forks : " + data[i].forks;
      updatedData.innerHTML = "Updated : " + data[i].updated_at;

    });

  })
  .catch(error => console.log("ERROR: " + error));



