const apiGitHubURL = 'https://api.github.com/';
const tesseractMembersURL = 'orgs/grupotesseract/public_members';

const userContainer = document.querySelector('#userContainer');
const selectDropDown = document.querySelector('#usersSelect');

const fetchMembers = async () => {
  const apiResponse = await fetch(`${apiGitHubURL}${tesseractMembersURL}`);
  return apiResponse.json();
}

const fetchThisMemberOnly = async (thisMember) => {
  const apiResponse = await fetch(`${apiGitHubURL}users/${thisMember}`);
  return apiResponse.json();
}

const setSelectOptions = async () => {
  const allMembers = await fetchMembers();
  allMembers.forEach(({login}) => {
    const selectOptions = document.createElement('option');
    selectOptions.innerText = login;
    selectOptions.setAttribute('value', login);
    selectDropDown.appendChild(selectOptions);
  })
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

const displayThisMemberOnly = async (event) => {
  userContainer.innerHTML = '';
  const selectedMember = event.target.value;
  if (selectedMember === '') return displayAllMembers();
  const thisMemberOnly = await fetchThisMemberOnly(selectedMember);
  const { avatar_url, login } = thisMemberOnly;
  const singleCardContainer = document.createElement('div');
    setInfoCard(singleCardContainer, avatar_url, login);
}

displayAllMembers();
setSelectOptions();

selectDropDown.addEventListener('change', displayThisMemberOnly);