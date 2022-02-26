const createDom = {
  default(container) {
    // create the elements
    const dContainer = document.createElement('div');
    dContainer.setAttribute('id', 'default-container');
    const header = document.createElement('h1');
    header.innerText = 'Weather App';
    const subtext = document.createElement('h4');
    subtext.innerText = 'Created using Geolocation and OpenWeather API';
    const button = document.createElement('button');
    button.innerText = 'Get Location';
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
  createCard(container, imgSrc, captionText, infoText) {
    // create the elements
    const card = document.createElement('div');
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

};

export default createDom;
