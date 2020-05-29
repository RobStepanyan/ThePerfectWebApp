# ThePerfectWebApp
Example of a perfect web app.

## This app is built with:<br>
### Front-end
* HTML/CSS/Bootstrap
* ReactJS

### Back-end
* Python
* Django
* PostgreSQL
* Rest API
* Redis (Soon Maybe:smile:)

### Other
* Docker: Docker-Compose

## How to run this app
* Make Sure to have installed
>1. Docker
>2. Python
>3. Node JS (for npm)
* Clone this Repository
```bash
cd <this_repo_name>/Container
```
```bash
docker-compose up --build
```
* go to http://localhost:3000

## What's in app?
[The idea is found in a random blog.](https://blog.bitsrc.io/15-app-ideas-to-build-and-level-up-your-coding-skills-28612c72a3b1)

Below You can find information about current project, and a guide if you want to repeat this app by yourself.

### GitHub Timeline
API’s and graphical representation of information are hallmarks of modern web applications. GitHub Timeline combines the two to create a visual history of a users GitHub activity.

The goal of GitHub Timeline is accept a GitHub user name and produce a timeline containing each repo and annotated with the repo names, the date they were created, and their descriptions. The timeline should be one that could be shared with a prospective employer. It should be easy to read and make effective use of color and typography.

Only public GitHub repos should be displayed.

#### User Stories
* User can enter a GitHub user name
* User can click a ‘Generate’ button to create and display the named users repo timeline
* User can see a warning message if the GitHub user name is not a valid GitHub user name.

#### Bonus Features
* User can see a summary of the number of repos tallied by the year they were created

#### Useful links and resources
GitHub offers two API’s you may use to access repo data. You may also choose to use an NPM package to access the GitHub API.

Documentation for the GitHub API can be found at:

* [GitHub REST API V3](https://developer.github.com/v3/)
* [GitHub GraphQL API V4](https://developer.github.com/v4/)

Sample code showing how to use the GitHub API’s are:

* [GitHub REST API client for JavaScript](https://github.com/octokit/rest.js/)
* [GitHub GraphQL API client for browsers and Node](https://github.com/octokit/graphql.js)

You can use this CURL command to see the JSON returned by the V3 REST API for your repos:

```bash
curl -u "user-id" https://api.github.com/users/user-id/repos
```
