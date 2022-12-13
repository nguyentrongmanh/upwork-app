export const state = () => ({
    cart: []
})

export const mutations = {
    ADD_ITEM(state, payload) {
        let inCart = state.cart.find(p => p.id === payload.id)

        if (!inCart) {
            state.cart.push({ ...payload, cart_quantity: 1 })
        } else {
            let index = state.cart.indexOf(inCart);
            state.cart.splice(index, 1, {
                ...inCart,
                cart_quantity: inCart.cart_quantity + 1
            })
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    DELETE_ITEM(state, payload) {
        let item = state.cart.find(p => p.id === payload)
        let index = state.cart.indexOf(item)
        state.cart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    INITIATE_CART(state) {
        if (localStorage.getItem('cart')) {
            state.cart = JSON.parse(localStorage.getItem('cart'))
        }
    },
    DECREASE_QUANTITY(state, productId) {
        let inCart = state.cart.find(p => p.id === productId)
        if (inCart) {
            let index = state.cart.indexOf(inCart);
            if (inCart.cart_quantity == 1) {
                state.cart.splice(index, 1)
            } else {
                state.cart.splice(index, 1, {
                    ...inCart,
                    cart_quantity: inCart.cart_quantity - 1
                })
            }
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    INCREASE_QUANTITY(state, productId) {
        let inCart = state.cart.find(p => p.id === productId)
        if (inCart) {
            let index = state.cart.indexOf(inCart);
            state.cart.splice(index, 1, {
                ...inCart,
                cart_quantity: inCart.cart_quantity + 1
            })
        }
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
}

export const actions = {
    addToCart({ commit }, item) {
        commit('ADD_ITEM', item)
    }
}