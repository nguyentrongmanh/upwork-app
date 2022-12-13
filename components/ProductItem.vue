<template>
    <div class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img :src="product.image" class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
        <p class="mt-1 text-md font-small text-gray-600">Stock {{ product.stock_quantity }}</p>
        <p class="mt-1 mb-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
        <a @click="addToCart"
            class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Add to cart
        </a>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: {},
            required: true
        }
    },
    methods: {
        addToCart() {
            let inCart = this.$store.state.cart.find(p => p.id === this.product.id)
            if (inCart && inCart.cart_quantity >= this.product.stock_quantity) {
                this.$notify({
                    type: 'warn',
                    text: `Can't buy more than ${this.product.stock_quantity}!`,
                })
            } else {
                this.$notify({
                    type: 'success',
                    text: `Added ${this.product.name} to the cart`,
                })
                this.$store.commit("ADD_ITEM", this.product)
            }

        }
    }
}
</script>
