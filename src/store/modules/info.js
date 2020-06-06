import HTTP from "@/http"
import Helpers from "@/utils/Helpers"
import {
    INFO_REQUEST,
    INFO_REQUEST_SUCCESS,
    INFO_REQUEST_ERROR
} from "../actions/info"

const state = {
    Status: null,
    UpdateDate: null
}

const getters = {
    IS_DB_UPDATE_DATE_LOADED: (state) => !!state.UpdateDate
}

const actions = {
    [INFO_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
        commit(INFO_REQUEST)
        HTTP({
            url: "info",
            method: "GET"
        })
            .then((response) => {
                resolve(response)
                if (response && response.data && response.status === 200) {
                    commit(INFO_REQUEST_SUCCESS, response.data)
                }
                else Helpers.notify("error", "Error retrieving data from backend")
            })
            .catch((error) => {
                reject(error)
                commit(INFO_REQUEST_ERROR, error)
            })
    })
}

const mutations = {
    [INFO_REQUEST]: (state) => {
        state.Status = "loading"
    },
    [INFO_REQUEST_SUCCESS]: (state, payload) => {
        state.Status = "success"
        state.UpdateDate = payload
    },
    [INFO_REQUEST_ERROR]: (state, payload) => {
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
