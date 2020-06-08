import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    // RELEASE_LIST_REQUEST,
    // RELEASE_LIST_REQUEST_SUCCESS,
    // RELEASE_LIST_REQUEST_ERROR,
    TOP_LIST_REQUEST,
    TOP_LIST_REQUEST_SUCCESS,
    TOP_LIST_REQUEST_ERROR
} from "../actions/release"

const state = {
    Status: null,
    Releases: [],
    TopWeekReleases: [],
    TopMonthReleases: []
}

const getters = {
    IS_TOP_WEEK_RELEASES_LOADED: (state) => !!(
        state.TopWeekReleases
        && typeof state.TopWeekReleases !== "undefined"
        && state.TopWeekReleases.length > 0
    ),
    IS_TOP_MONTH_RELEASES_LOADED: (state) => !!(
        state.TopMonthReleases
        && typeof state.TopMonthReleases !== "undefined"
        && state.TopMonthReleases.length > 0
    )
}

const actions = {
    [TOP_LIST_REQUEST]: ({ commit }, payload) => new Promise((resolve, reject) => {
        commit(TOP_LIST_REQUEST)
        HTTP({
            url: "toptrax",
            params: payload,
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(TOP_LIST_REQUEST_SUCCESS, {
                        data: response.data,
                        params: payload
                    })
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(TOP_LIST_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [TOP_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [TOP_LIST_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        if (payload.params.weeks === 1) state.TopWeekReleases = payload.data
        else if (payload.params.weeks === 4) state.TopMonthReleases = payload.data
    },
    [TOP_LIST_REQUEST_ERROR]: (state, payload) => {
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
