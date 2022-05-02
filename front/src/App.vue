<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
              <h1 class="text-center">PokeCatch</h1>
      </div>

    </v-app-bar>

    <v-main>   
      <PokeGame />
    </v-main>
  </v-app>
</template>

<script>
import PokeGame from './components/PokeGame.vue'

export default {
  name: 'App',

  components: {
     PokeGame
  },

  data: () => ({
    //
  }),
};
</script>
