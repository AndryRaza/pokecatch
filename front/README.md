# front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

v-bind

https://codepen.io/ChrisHuie/pen/PmNgVG

    returnName(id) {
      let result = this.trainersPokemon.filter((p) => {
        return p.id == id;
      });
      if (result.length > 0) {
        return (
          result[0].name.charAt(0).toUpperCase() +
          result[0].name.substring(1).toLowerCase()
        );
      } else {
        return "--------------------";
      }
    },


          //   this.trainersPokemon.push({
            //     id: d.id,
            //     name: d.name,
            //     sprite: d.sprites.front_default,
            //   });


            https://michaelnthiessen.com/force-re-render/