const createDom = {
  default(container) {
    // create the elements
    const dContainer = document.createElement('div');
    dContainer.setAttribute('id', 'default-container');
    dContainer.classList.add('polka-dot');
    const header = document.createElement('h1');
    header.innerText = 'Weather App';
    const subtext = document.createElement('h4');
    subtext.innerText = 'Created using Geolocation and OpenWeather API';
    const button = document.createElement('button');
    button.innerText = 'Get Weather';
    button.setAttribute('id', 'geo-button');

    // add to container & push container to DOM
    dContainer.appendChild(header);
    dContainer.appendChild(subtext);
    dContainer.appendChild(button);
    container.appendChild(dContainer);
  },
  clearNodesFrom(node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  },
  createCard(container, imgSrc, captionText, infoText, cClass) {
    // create the elements
    const card = document.createElement('div');
    card.classList.add(cClass);
    card.classList.add('card');
    const img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', captionText);
    const caption = document.createElement('h4');
    caption.innerText = captionText;
    const info = document.createElement('p');
    info.innerHTML = infoText;

    // add to a container
    card.appendChild(img);
    card.appendChild(caption);
    card.appendChild(info);
    container.appendChild(card);
  },
  createPopup(container, msg) {
    // create the elements
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const topbar = document.createElement('div');
    topbar.innerText = 'Alert';
    const info = document.createElement('div');
    info.innerHTML = msg;

    function moveItem() {
      let mousedown = true;
      onmousemove = function (e) {
        if (mousedown === true) {
          popup.style.left = `${e.clientX - (popup.clientWidth / 2)}px`;
          popup.style.top = `${e.clientY}px`;
        }
      };

      onmouseup = function () {
        mousedown = false;
      };
    }

    topbar.addEventListener('mousedown', (e) => {
      moveItem(e);
    });

    // add to container
    popup.appendChild(topbar);
    popup.appendChild(info);
    container.appendChild(popup);
  },

};

export default createDom;
