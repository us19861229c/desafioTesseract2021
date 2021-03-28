const apiGitHubURL = 'https://api.github.com/';
const tesseractMembersURL = 'orgs/grupotesseract/public_members';

const userContainer = document.querySelector('#userContainer');

const fetchMembers = async () => {
  const apiResponse = await fetch(`${apiGitHubURL}${tesseractMembersURL}`);
  return apiResponse.json();
}

const createImgElement = (singleCard, img_url, loginText) => {
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', img_url);
  imgElement.setAttribute('alt', `avatar de ${loginText}`);
  singleCard.appendChild(imgElement);
}

const createLoginTitleElement = (singleCard, loginText) => {
  const loginElement = document.createElement('h2');
  loginElement.innerText = loginText;
  singleCard.appendChild(loginElement);
}

const setInfoCard = (singleCard, img_url, loginText) => {
  singleCard.setAttribute('id', `${loginText}Id`);
  createImgElement(singleCard, img_url, loginText);
  createLoginTitleElement(singleCard, loginText)
  userContainer.appendChild(singleCard);
}

const displayAllMembers = async () => {
  const allMembers = await fetchMembers();
  allMembers.forEach(({avatar_url, login}) => {
    const singleCardContainer = document.createElement('div');
    setInfoCard(singleCardContainer, avatar_url, login);
  });
}

displayAllMembers();