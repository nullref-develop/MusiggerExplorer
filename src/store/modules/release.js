import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    RELEASE_LIST_REQUEST,
    RELEASE_LIST_REQUEST_SUCCESS,
    RELEASE_LIST_REQUEST_ERROR,
    RELEASE_REQUEST,
    RELEASE_REQUEST_SUCCESS,
    RELEASE_REQUEST_ERROR,
    TOP_LIST_REQUEST,
    TOP_LIST_REQUEST_SUCCESS,
    TOP_LIST_REQUEST_ERROR
} from "../actions/release"

const state = {
    Status: null,
    Releases: [],
    ReleasesTotal: 0,
    TopWeekReleases: [],
    TopMonthReleases: []
}

const getters = {
    GET_RELEASE_BY_ID: (state) => (id) => {
        const ReleaseFromReleases = state.Releases.find((x) => x.Id === id)
        const ReleaseFromTopWeek = state.TopWeekReleases.find((x) => x.Id === id)
        const ReleaseFromTopMonth = state.TopMonthReleases.find((x) => x.Id === id)
        if (ReleaseFromReleases) return ReleaseFromReleases
        if (ReleaseFromTopWeek) return ReleaseFromTopWeek
        if (ReleaseFromTopMonth) return ReleaseFromTopMonth
        return null
    },
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
    [RELEASE_LIST_REQUEST]: ({ commit }, params) => new Promise((resolve, reject) => {
        commit(RELEASE_LIST_REQUEST)
        HTTP({
            url: "releases",
            params,
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(RELEASE_LIST_REQUEST_SUCCESS, response)
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(RELEASE_LIST_REQUEST_ERROR, error)
            })
    }),
    [RELEASE_REQUEST]: ({ commit }, params) => new Promise((resolve, reject) => {
        commit(RELEASE_REQUEST)
        HTTP({
            url: "releases",
            params,
            method: "GET",
            validateStatus(status) {
                return status < 400
            }
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(RELEASE_REQUEST_SUCCESS)
                }
                else if (response && response.status === 304) {
                    commit(RELEASE_REQUEST_SUCCESS)
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(RELEASE_REQUEST_ERROR, error)
            })
    }),
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
    [RELEASE_LIST_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RELEASE_LIST_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.Releases = payload.data
        state.ReleasesTotal = parseInt(payload.headers["x-total"], 10)
    },
    [RELEASE_LIST_REQUEST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.Error) {
            Helpers.notify("error", payload.response.data.Error)
        }
        else Helpers.notify("error", "Default message about error on backend")
    },
    [RELEASE_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [RELEASE_REQUEST_SUCCESS]: (state) => {
        state.Status = "success"
    },
    [RELEASE_REQUEST_ERROR]: (state, payload) => {
        state.Status = "error"
        if (payload && payload.response && payload.response.data && payload.response.data.Error) {
            Helpers.notify("error", payload.response.data.Error)
        }
        else Helpers.notify("error", "Default message about error on backend")
    },
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
