const apiGitHubURL = 'https://api.github.com/';
const tesseractMembersURL = 'orgs/grupotesseract/public_members';

const fetchMembers = async () => {
  const apiResponse = await fetch(`${apiGitHubURL}${tesseractMembersURL}`);
  return apiResponse.json();
}

const displayAllMembers = async () => {
  const allMembers = await fetchMembers();
  allMembers.forEach(member => {
    console.log(member);
  });
}

displayAllMembers();