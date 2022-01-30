import axios from "axios";

const githubRequest = axios.create({
  baseURL: "https://api.github.com"
})

const headerConfig = {
  accept: 'application/vnd.github.v3+json'
}

githubRequest.interceptors.response.use(res => res.data, err => err.response);

export const getUserProfile = username => githubRequest.get(`/users/${username}`);
export const getRepository = (owner, repository) => githubRequest.get(`/repos/${owner}/${repository}`);
export const getReposWithUsernameAndPage = (username, page) => githubRequest.get(`/users/${username}/repos`, {
  headers: headerConfig, params: {
    sort: 'created',
    per_page: 10,
    page
  }
});