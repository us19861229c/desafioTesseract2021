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

const dateFormat = dateInfo => dateInfo.replaceAll('-', '/').slice(0,10)
  .split("/").reverse().join("/");

const createNumericDataInfo = ( public_repos, followers, created_at) => {
  const repoQuantity = document.createElement('p');
  repoQuantity.textContent = `Repos: ${public_repos}`;
  const followersQuantity = document.createElement('p');
  followersQuantity.textContent = `Seguidores: ${followers}`;
  const createdAt = document.createElement('p');
  createdAt.textContent = `Criado em: ${dateFormat(created_at)}`;
  return [repoQuantity, followersQuantity, createdAt];
}

const setInfoCard = (singleCard, img_url, loginText) => {
  singleCard.setAttribute('id', `${loginText}Id`);
  createImgElement(singleCard, img_url, loginText);
  createLoginTitleElement(singleCard, loginText)
  userContainer.appendChild(singleCard);
}

async function showMoreInfo() {
  this.classList.toggle('moreInfo')
  if(this.className.includes('moreInfo')) {
    const memberName = this.innerText;
    const thisMember = await fetchThisMemberOnly(memberName);
    const { public_repos, followers, created_at } = thisMember;
    createNumericDataInfo(public_repos, followers, created_at ).forEach((tagElement) => {
      this.appendChild(tagElement);
    });
  } else {
    for (let i = 0; i <= 2; i += 1) {
      this.removeChild(this.lastChild);
    }
  }
}

const displayAllMembers = async () => {
  const allMembers = await fetchMembers();
  allMembers.forEach(({avatar_url, login}) => {
    const singleCardContainer = document.createElement('div');
    setInfoCard(singleCardContainer, avatar_url, login);
    singleCardContainer.addEventListener('click', showMoreInfo);
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
    singleCardContainer.addEventListener('click', showMoreInfo);
}

displayAllMembers();
setSelectOptions();

selectDropDown.addEventListener('change', displayThisMemberOnly);