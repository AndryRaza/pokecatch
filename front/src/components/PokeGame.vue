<template>
  <v-container id="game">
    <v-btn v-if="!showTimer" color="green" v-on:click="funccore()"
      >Herbe
    </v-btn>
    <p v-if="showTimer" class="text-center" id="timer">{{ timer }}</p>
        <div v-if="alreadyCaught" class="pokeball_"></div>
    <div class="d-flex align-center h-100">
      <div v-if="caught" class="pokeball pokeball-animated"></div>
      <v-img
        v-else
        :src="spritePokemon"
        :lazy-src="spritePokemon"
        class="img-fluid"
        contain
        height="300"
      />
    </div>

    <p class="px-14">Écrire son nom :</p>
    <v-text-field
      type="text"
      class="px-14"
      v-model="namePokemon"
      v-on:keyup.enter="submit()"
    />
    <div class="px-14 d-flex flex-row-reverse">
      <v-btn color="blue" v-on:click="submit()">Attraper</v-btn>
    </div>
  </v-container>
</template>

<script>
import {
  getPokemonRandom,
  random,
  getPokemonName,
} from "../service/pokemonService";
import { savePokemon, getTrainersPokemons } from "../service/trainerService";

export default {
  name: "PokeGame",
  data: function () {
    return {
      spritePokemon: "",
      namePokemon: null,
      timer: null,
      intervaltimer: null,
      intervalcore: null,
      showTimer: false,
      idPokemon: null,
      realNamePokemon: null,
      caught: false,
      trainerspokemon: [],
      alreadyCaught : false
    };
  },
  mounted() {
    getTrainersPokemons(1).then((res) => {
      this.trainerspokemon = res;
    });
  },
  methods: {
    pokemonAppearance(str) {
      // this.spritePokemon = res.sprites.front_default;
      this.spritePokemon = str;
    },
    functimer() {
      this.showTimer = true;
      this.intervaltimer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.stopcore("timer");
        }
      }, 1000);
    },
    funccore() {
      this.namePokemon = "";
      getPokemonRandom().then((res) => {
        this.pokemonAppearance(res.sprites.front_default);
        this.functimer();
        this.idPokemon = res.id;
        this.alreadyCaught = this.trainerspokemon.includes(this.idPokemon)
        getPokemonName(res.id).then((name) => {
          this.realNamePokemon = name[0];
        });
      });
    },
    stopcore(from) {
      this.spritePokemon = "";
      this.namePokemon = "";
      this.alreadyCaught = false;
      if (from === "timer") {
        clearInterval(this.intervaltimer);
        this.showTimer = false;
        this.realNamePokemon = null;
        this.idPokemon = null;
        this.timer = random(5, 10);
      }

      if (from == "caught") {
        setTimeout(() => {
          clearInterval(this.intervaltimer);
          this.showTimer = false;
          this.realNamePokemon = null;
          this.idPokemon = null;
          this.timer = random(5, 10);
        }, 5000);
      }
    },
    submit() {
      if (
        this.realNamePokemon &&
        this.showTimer &&
        this.idPokemon &&
        !this.caught
      ) {
        if (
          this.realNamePokemon.toLowerCase().trim() ==
          this.namePokemon.toLowerCase().trim()
        ) {
          this.namePokemon = "";
          this.caught = true;
          savePokemon(1, this.idPokemon);
          setTimeout(() => {
            this.caught = false;
          }, 5000);
          this.stopcore("caught");
        }
      }
    },
  },
  created() {
    this.timer = random(5, 10);
  },
};
</script>

<style>
#game{
  position: relative;
}


#timer {
  font-size: 30px;
}
.pokeball {
  box-sizing: border-box;
  border: 10px solid #262122;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  margin: 0 auto;
  background: linear-gradient(
    150deg,
    #ba0c2f 0%,
    #ba0c2f 48%,
    #262122 48%,
    #262122 52%,
    #fff 52%,
    #fff 100%
  );
}

.pokeball:before,
.pokeball:after {
  content: " ";
  border-radius: 100%;
  display: block;
  position: absolute;
}

.pokeball:before {
  background: #262122;
  width: 80px;
  height: 80px;
  margin-top: 75px;
  margin-left: 75px;
}

.pokeball:after {
  background: #fff;
  width: 50px;
  height: 50px;
  margin-top: 90px;
  margin-left: 91px;
  border: double 20px #262122;
}

.pokeball-animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: 3;
  animation-name: shake;
}

@keyframes shake {
  from {
    transform: none;
  }
  20% {
    transform: translate3d(-20%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  40% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 5deg);
  }
  50% {
    transform: translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -10deg);
  }
  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 50deg);
  }
  to {
    transform: none;
  }
}

.pokeball_ {
  position: absolute;
  top:44px;
  left:43%;
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 20px;
  border: 6px solid #ccc;
  border-radius: 50%;
  background-image: -moz-radial-gradient(
      40% 40%,
      circle,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    -moz-linear-gradient(-90deg, #f33 45%, #333 45%, #3f3f3f 50%, #333 55%, #fff
          55%);
  background-image: -webkit-radial-gradient(
      40% 40%,
      circle,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    -webkit-linear-gradient(-90deg, #f33 45%, #333 45%, #3f3f3f 50%, #333 55%, #fff
          55%);
}

.pokeball_:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 6;
  width: -50%;
  height: -50%;
  border-radius: 50%;
}

.pokeball_:after {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  width: 94%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0);
  margin: 45% 3%;
}
</style>