export const state = () => ({
    user: null
})

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    async login({ commit }, params) {

    }
}