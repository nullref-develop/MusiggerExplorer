# Musigger Explorer

Web application for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists. Also it offers superrior perfomance and modern design.

## Project suspended!

We haven't free time and money to host Musigger for now. So you can do it yourself. Thank everyone used Musigger.

Although donations can make a change. 
* **BTC** 1PgSXDDGCeDoMJiaRWE2tJE1a6iVo8MXym
* **ETH** 0x616F0F303BF877C8DbF8f38B65f988D74eB380e9
* **Yandex.Money** https://yoomoney.ru/to/410015331091964

---

## Getting Started

First of all, you need to set up and run [web api server]([contributors](https://github.com/your/project/contributors)) and make DB.

Next, clone a copy of git repository and install dependencies

```npm
git clone git://github.com/Musigger/MusiggerExplorer.git
npm install
```

Install vue-cli

```npm
npm install -g @vue/cli
```

When go to /src/main.js and change the url where your web api server is hosted:

```js
Vue.prototype.apiUrl = 'http://localhost:49951/api'
```

And run the app in development mode at localhost:8080

```npm
npm run dev
```

## Built With

* [Vue](https://github.com/vuejs/vue) - A progressive, incrementally-adoptable JavaScript framework for building UI on the web
* [Vue-cli](https://github.com/vuejs/vue-cli) - Vue CLI is a full system for rapid Vue.js development
* [Vue-router](https://github.com/vuejs/vue-router) - The official router for Vue.js
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Foundation for sites](https://github.com/zurb/foundation-sites) - The most advanced responsive front-end framework in the world

## Authors

* **[Anton Zolotov](https://github.com/joseph2)** - *Client single page application*
* **[Egor Shoba](https://github.com/silentfobos)** - *Server Web API*

## License

This project is licensed under the Mozilla Public License 2.0 - see the LICENSE.md file for details
