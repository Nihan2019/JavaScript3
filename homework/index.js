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
               const header = createAndAppend('header', root, {
          class: 'header',
        });
        createAndAppend('p', header, {
          text: 'HYF Repositories',
        });
        const selectMenu = createAndAppend('select', header, {
          class: 'repo_selector',
        });
        console.log(data);
        selectMenu.innerHTML = data.sort((a, b) =>
          a.name.localeCompare(b.name, 'en', {
            sensivity: 'base',
          }),
        );
        for (let i = 0; i < data.length; i++) {
          createAndAppend('option', selectMenu, {
            text: data[i].name,
            value: i,

          });
        }
        const containerDiv = createAndAppend('div', root, {
          id: 'container',
        });
        const repoDiv = createAndAppend('div', containerDiv, {
          class: 'left-div',
        });
        const table = createAndAppend('table', repoDiv);

        const contributorsDiv = createAndAppend('div', containerDiv, {
          class: 'right-div',
        });
        createAndAppend('p', contributorsDiv, {
          text: 'Contributors',
          class: 'contributor_header',
        });
        const ul = createAndAppend('ul', contributorsDiv, {
          class: 'contributor_list',
        });


        const showRepo = (i) => {

          const tr = createAndAppend('tr', table);
          createAndAppend('td', tr, {
            text: 'Repository:',
            class: 'label',
          });

          const repoLink = createAndAppend('td', tr);
          createAndAppend('a', repoLink, {
            href: data[i].svn_url,
            target: '_blank',
            text: data[i].name,
          });
          const descriptionTr = createAndAppend('tr', table);
          createAndAppend('td', descriptionTr, {
            text: `Description: ${data[i].description}`,
          });
          const forksTr = createAndAppend('tr', table);
          createAndAppend('td', forksTr, {
            text: `Forks:  ${data[i].forks}`,
          });
          const updatedTr = createAndAppend('tr', table);
          createAndAppend('td', updatedTr, {
            text: `Updated:  ${data[i].updated_at}`,
          });
          const contributionsInfo = () => {
            fetch(data[i].contributors_url)
              .then(response => response.json()).then(dataCont => {
                console.log(dataCont);
                const li = createAndAppend('li', ul, {
                  class: 'contributor_item',
                });
                createAndAppend('img', li, {
                  src: dataCont[i].avatar_url,
                  height: '50px',
                  class: 'contributor_avatar',
                });
                const contDataDiv = createAndAppend('div', li, {
                  class: 'contributor_data',
                });
                createAndAppend('div', contDataDiv, {
                  text: dataCont[i].login,
                });
                createAndAppend('div', contDataDiv, {
                  text: `${dataCont[i].contributions}`,
                  class: 'contribution_badge',
                });
              });

          }
          contributionsInfo()
        }
        showRepo(0);

        const removeChildren = (parent) => {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
        };

        selectMenu.addEventListener("change", function () {
          removeChildren(table);
          removeChildren(ul);
          const i = this.value;
          showRepo(i);
        });
      }
    });

  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}
        
        
     
