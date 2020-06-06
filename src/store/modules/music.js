import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    GENRE_LIST_REQUEST,
    GENRE_LIST_REQUEST_SUCCESS,
    GENRE_LIST_REQUEST_ERROR,
    LABEL_LIST_REQUEST,
    LABEL_LIST_REQUEST_SUCCESS,
    LABEL_LIST_REQUEST_ERROR
} from "../actions/music"

const state = {
    Status: null,
    Genres: [],
    Labels: []
}

const getters = {
    IS_GENRES_LOADED: (state) => !!(
        state.Genres
        && typeof state.Genres !== "undefined"
        && state.Genres.length > 0
    ),
    IS_LABELS_LOADED: (state) => !!(
        state.Labels
        && typeof state.Labels !== "undefined"
        && state.Labels.length > 0
    )
}

const actions = {
    [GENRE_LIST_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
        commit(GENRE_LIST_REQUEST)
        HTTP({
            url: "genres",
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(GENRE_LIST_REQUEST_SUCCESS, response.data)
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(GENRE_LIST_REQUEST_ERROR, error)
            })
    }),
    [LABEL_LIST_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
        commit(LABEL_LIST_REQUEST)
        HTTP({
            url: "labels",
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(LABEL_LIST_REQUEST_SUCCESS, response.data)
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(LABEL_LIST_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [GENRE_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [GENRE_LIST_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Genres = payload
    },
    [GENRE_LIST_REQUEST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.Error) {
            Helpers.notify("error", payload.response.data.Error)
        }
        else Helpers.notify("error", "Default message about error on backend")
    },
    [LABEL_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [LABEL_LIST_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Labels = payload
    },
    [LABEL_LIST_REQUEST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.Error) {
            Helpers.notify("error", payload.response.data.Error)
        }
        else Helpers.notify("error", "Default message about error on backend")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
