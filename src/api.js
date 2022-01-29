import axios from "axios";

const userRequest = axios.create({
  baseURL: "https://api.github.com/users",
})

const repositoryRequest = axios.create({
  baseURL: "http://api.github.com/repos"
})

const headerConfig = {
  accept: 'application/vnd.github.v3+json'
}

userRequest.interceptors.response.use(res => res.data, err => err.response);
repositoryRequest.interceptors.response.use(res => res.data, err => err.response);

export const getUserProfile = username => userRequest.get(`/${username}`);
export const getRepository = (owner, repository) => repositoryRequest.get(`/${owner}/${repository}`);
export const getReposWithUsernameAndPage = (username, page) => userRequest.get(`/${username}/repos`, {
  headers: headerConfig, params: {
    sort: 'created',
    per_page: 10,
    page
  }
});