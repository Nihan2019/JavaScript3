'use strict';



{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {

        const firstDiv = document.getElementById("root");
        const header = firstDiv.appendChild(document.createElement("header"));
        header.id = "header";
        const headerTitle = header.appendChild(document.createElement("h2"));
        headerTitle.innerHTML = "HYF Repositories";

        const repoSelect = header.appendChild(document.createElement("select"));
        repoSelect.id = "reposelect";

        const container = firstDiv.appendChild(document.createElement("div"));
        container.className = "container";

        const leftHandDiv = container.appendChild(document.createElement("div"));
        leftHandDiv.className = "left-div";
        leftHandDiv.className += " whiteframe";

        const rightHandDiv = container.appendChild(document.createElement("div"));
        rightHandDiv.className = "right-div";
        rightHandDiv.className += " whiteframe";







        const repos = document.getElementById("reposelect");
        data.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });

        repos.innerHTML = data.map(
          (repo, i) => `<option value="${i}">${repo.name}</option>`
        ).join("");
      }



    });



  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
