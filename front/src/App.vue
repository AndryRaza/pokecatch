<template>
  <v-app>
    <v-app-bar color="primary" dark app id="bar">
      <div class="d-flex align-center">
        <h1 class="text-center">
          <router-link class="link" to="/">PokeCatch</router-link>
          </h1>
      </div>
      <div class="pt-6 mx-6">
        <p>
          <router-link class="link" to="/pokedex">Pokedex</router-link>
        </p>
      </div>
    </v-app-bar>
    <div class="py-16">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>


<style scoped>
.link{
  color:white !important;
  text-decoration: none;
}
</style>