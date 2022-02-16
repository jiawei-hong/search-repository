import axios from "axios";

const githubRequest = axios.create({
  baseURL: "https://api.github.com"
})

const headerConfig = {
  accept: 'application/vnd.github.v3+json'
}

githubRequest.interceptors.response.use(res => res.data, err => err.response);

// https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc&per_page=10&page=1
export const getMostStarsWithRepository = page => githubRequest.get(`/search/repositories?q=stars:%3E10000&sort=stars&order=desc&per_page=10&page=${page}`)
export const getUserProfile = username => githubRequest.get(`/users/${username}`);
export const getRepository = (owner, repository) => githubRequest.get(`/repos/${owner}/${repository}`);
export const getReposWithUsernameAndPage = (username, page) => githubRequest.get(`/users/${username}/repos`, {
  headers: headerConfig, params: {
    sort: 'pushed',
    per_page: 10,
    page
  }
});
export const getRepoMostUseLanguages = (repo_username, repo_name) => githubRequest.get(`/repos/${repo_username}/${repo_name}/languages`);
export const getRepoReadMarkdown = (repo_username, repo_name) => githubRequest.get(`/repos/${repo_username}/${repo_name}/contents/README.md`);