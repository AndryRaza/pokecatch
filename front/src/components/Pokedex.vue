<template>
  <v-container>
    <h1>Pokedex</h1>
    <div v-if="!loading">
      <div v-for="n in lenPokedex" :key="n">
        <v-row>
          <v-col>
            <p v-if="n >= 10">{{ n }}</p>
            <p v-else>0{{ n }}</p>
          </v-col>
          <v-col>
            <!-- <p>{{ returnName(n) }}</p> -->
            <p>{{ arrInfosName[n] }}</p>
          </v-col>
          <v-col>
            <p>description</p>
          </v-col>
          <v-col>
            <!-- <v-img
            :src="trainersPokemon.filter(i=>{return i.id == n})[0].sprite"
            :lazy-src="trainersPokemon.filter(i=>{return i.id == n})[0].sprite"
            class="img-fluid"
            contain
            height="300"
          /> -->
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>Chargement</div>
  </v-container>
</template>

<script>
import { getPokemon } from "../service/pokemonService";
import { getTrainersPokemons } from "../service/trainerService";

export default {
  name: "Pokedex",
  data: function () {
    return {
      lenPokedex: 0,
      trainersPokemon: [],
      arrInfosName: null,
      arrInfosSprite: null,
      loading: true,
    };
  },
  created() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      getTrainersPokemons(1).then((res) => {
        this.lenPokedex = Math.max.apply(null, res);
        this.arrInfosName = Array(this.lenPokedex + 1).fill("------");
        this.arrInfosSprite = Array(this.lenPokedex + 1).fill("------");
        res.map((i) => {
          getPokemon(i).then((d) => {
            this.arrInfosName[i] = d.name;
            this.arrInfosSprite[i] = d.sprites.front_default;
            this.loading = true;
            
          });
        });
      });
    },
  },
};
</script>