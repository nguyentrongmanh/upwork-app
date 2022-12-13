<template>
  <modal height="auto" name="my-first-modal">
    <div as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
      enter-from="translate-x-full" enter-to="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
      leave-to="translate-x-full">
      <div class="pointer-events-auto">
        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <div class="text-lg font-medium text-gray-900">Shopping cart</div>
              <div class="ml-3 flex h-7 items-center">
                <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="hide">
                  <span class="sr-only">Close panel</span>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-8">
              <div class="flow-root">
                <ul v-if="cart" role="list" class="-my-6 divide-y divide-gray-200">
                  <li v-for="product in cart" :key="product.id" class="flex py-6">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img :src="product.image" class="h-full w-full object-cover object-center" />
                    </div>

                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a :href="product.href">{{ product.name }}</a>
                          </h3>
                          <p class="ml-4">{{ product.price }}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm">
                        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <a href="#" @click="DECREASE_QUANTITY(product.id)"
                            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            -
                          </a>
                          <a href="#"
                            class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">{{
                                product.cart_quantity
                            }}</a>
                          <a href="#" @click="addToCart(product)"
                            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            +
                          </a>
                        </nav>

                        <div class="flex">
                          <button type="button" @click="DELETE_ITEM"
                            class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${{ totalAmount }}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div class="mt-6">
              <a href="#"
                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
            </div>
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="hide">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {

  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Throwback Hip Bag',
          href: '#',
          color: 'Salmon',
          price: '$90.00',
          quantity: 1,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
          imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        },
        {
          id: 2,
          name: 'Medium Stuff Satchel',
          href: '#',
          color: 'Blue',
          price: '$32.00',
          quantity: 1,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
          imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
        {
          id: 2,
          name: 'Medium Stuff Satchel',
          href: '#',
          color: 'Blue',
          price: '$32.00',
          quantity: 1,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
          imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
        // More products...
      ]
    }
  },
  computed: {
    ...mapState([
      'cart'
    ]),
    totalAmount() {
      return this.cart.map((product) => {
        return product.price * product.cart_quantity
      }).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    show() {
      this.$modal.show('my-first-modal');
    },
    hide() {
      this.$modal.hide('my-first-modal');
    },
    ...mapMutations([
      'DECREASE_QUANTITY',
      'INCREASE_QUANTITY',
      'DELETE_ITEM'
    ]),
    addToCart(product) {
      let inCart = this.$store.state.cart.find(p => p.id === product.id)
      if (inCart && inCart.cart_quantity >= product.stock_quantity) {
        this.$notify({
          type: 'warn',
          text: `Can't buy more than ${product.stock_quantity}!`,
        })
      } else {
        this.$store.commit("INCREASE_QUANTITY", product.id)
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

</style>