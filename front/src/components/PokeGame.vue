<template>
  <v-container id="game">
    <v-btn v-if="!showTimer" color="green" v-on:click="funccore()"
      >Herbe
    </v-btn>
    <p v-if="showTimer" class="text-center" id="timer">{{ timer }}</p>
    <div class="d-flex align-center h-100">
      <div v-if="caught" class="pokeball pokeball-animated"></div>
    </div>

    <v-img
      :src="spritePokemon"
      :lazy-src="spritePokemon"
      class="img-fluid"
      contain
      height="300"
    />
    <p class="px-14">Écrire son nom :</p>
    <v-text-field
      type="text"
      class="px-14"
      v-model="namePokemon"
      v-on:keyup.enter="submit()"
    />
    <div class="px-14 d-flex flex-row-reverse">
      <v-btn color="blue" v-on:click="submit()">Valider</v-btn>
    </div>
  </v-container>
</template>

<script>
import {
  getPokemonRandom,
  random,
  getPokemonName,
} from "../service/pokemonService";

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
    };
  },
  mounted() {},
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
        getPokemonName(res.id).then((name) => {
          this.realNamePokemon = name;
        });
      });
    },
    stopcore(from) {
      this.spritePokemon = "";
      this.namePokemon = "";

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
</style>