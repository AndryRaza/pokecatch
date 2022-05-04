<template>
  <v-container>
    <h1>Pokedex</h1>
   
    <div :key="loading">
      <div v-for="n in lenPokedex" :key="n">
        <v-row>
          <v-col class="name" cols="1">
            <p  v-if="n >= 10">{{ n }}</p>
            <p v-else>0{{ n }}</p>
          </v-col>
          <v-col class="name">
            <!-- <p>{{ returnName(n) }}</p> -->
            <p>{{ arrInfosName[n] }}</p>
          </v-col>
          <v-col class="name">
            <p>{{arrInfosDescription[n]}}</p>
          </v-col>
          <v-col>
            <v-img
            :src="arrInfosSprite[n]"
            :lazy-src="arrInfosSprite[n]"
            class="img-fluid"
            contain
            height="150"
          />
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>
    </div>
  </v-container>
</template>

<script>
import { getPokemonName } from "../service/pokemonService";
import { getTrainersPokemons } from "../service/trainerService";
// Globally

export default {
  name: "Pokedex",
  data: function () {
    return {
      lenPokedex: 0,
      trainersPokemon: [],
      arrInfosName: null,
      arrInfosDescription : null,
      arrInfosSprite: null,
      loading: 0,
    };
  },
  created() {
    this.init();
    this.$forceUpdate();
  },
  computed: {},
  methods: {
    init() {
      getTrainersPokemons(1).then((res) => {
        this.lenPokedex = Math.max.apply(null, res);
        this.arrInfosName = Array(this.lenPokedex + 1).fill("------");
        this.arrInfosDescription = Array(this.lenPokedex + 1).fill("------");
        this.arrInfosSprite = Array(this.lenPokedex + 1).fill("------");
        res.map((i) => {
          getPokemonName(i).then((d) => {
            this.arrInfosName[i] = d[0];
            this.arrInfosDescription[i] = d[1]
            this.arrInfosSprite[i] = d[2];
            this.loading++;
          });
        });
      });
    },
  },
};
</script>

<style scoped>
.name{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>