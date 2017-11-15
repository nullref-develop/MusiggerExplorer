# Musigger Explorer

Web application for searching and filtering music releases. Musiggger provide flexible release filtering system by genres, types, labels, votes and even artists. Also it offers superrior perfomance and modern design.

## Getting Started

First of all, you need to run [web api server]([contributors](https://github.com/your/project/contributors)) and make DB. 
Next, clone a copy of git repository and install dependencies
```
git clone git://github.com/Musigger/MusiggerExplorer.git
npm install
```
When go to [main.js file]([contributors](src/main.js)) and change the url where your web api server is hosted:
```
Vue.prototype.apiUrl = 'http://localhost:49951/api'
```
And run the app in development mode at localhost:8080
```
npm run dev
```

## Built With

* [Vue](https://github.com/vuejs/vue) - A progressive, incrementally-adoptable JavaScript framework for building UI on the web
* [Vue-router](https://github.com/vuejs/vue-router) - The official router for Vue.js
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Foundation for sites](https://github.com/zurb/foundation-sites) - The most advanced responsive front-end framework in the world

## Authors

* **[Anton Zolotov](https://github.com/PurpleBooth)** - *Clinet single page application*
* **[Egor Shoba](https://github.com/PurpleBooth)** - *Server Web API*

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE.md](LICENSE.md) file for details