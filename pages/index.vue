<template>
  <!-- <Tutrial/> -->
  <div class="bg-white">
    <div class="ml-auto flex items-center">
      <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</a>
        <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
        <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
      </div>

      <!-- Cart -->
      <div class="ml-4 flow-root lg:ml-6">
        <a href="#" class="group -m-2 flex items-center p-2" @click="openCartModal">
          <!-- Heroicon name: outline/shopping-bag -->
          <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ cart.lenght }}</span>
          <span class="sr-only">items in cart, view bag</span>
        </a>
      </div>
    </div>
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>



      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem>

        <!-- More products... -->
      </div>
    </div>
    <Cart ref="CartModal"></Cart>
    <notifications position="bottom right" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Earthen Bottle",
          image: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
          stock_quantity: 15,
          price: 12
        },
        {
          id: 2,
          name: "Nomad Tumbler",
          image: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
          stock_quantity: 10,
          price: 25
        },
        {
          id: 3,
          name: "Focus Paper Refill",
          image: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
          stock_quantity: 4,
          price: 14
        },
        {
          id: 4,
          name: "Machined Mechanical Pencil",
          image: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
          stock_quantity: 7,
          price: 55
        },
      ]
    }
  },
  beforeCreate() {
    this.$store.commit("INITIATE_CART")  
  },
  computed: {
    ...mapState([
      'cart'
    ])
  },
  methods: {
    openCartModal() {
      this.$refs.CartModal.show()
    }
  }
}
</script>
