<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">FileName</label>
       <input class="u-full-width" type="text"
         v-model="music.name">
      </div>
            <div class="six columns">
       <label for="titleInput">URL</label>
       <input class="u-full-width" type="text"
         v-model="music.url">
      </div>
     </div>
          <div class="row">
      <div class="six columns">
       <label for="titleInput">Artista</label>
       <input class="u-full-width" type="text"
         v-model="music.artista">
      </div>
     </div>

     <div class="row">
      <router-link class="button button-primary" 
        to="/musicData">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateMusic(music._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createMusic()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Music Details",
  props: ["create","edit","create"],
  data() {
    return {
      title: "Music Data",
      music: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findMusic(route.params.id);
    else {
      this.music = {
        "_id": Math.floor(Math.random()*100000000),"fileName":"","url":"","artista":"","categoria":{
          "idcategoria":2,
          "name":"Reggeaton"
        }
         };
    }
  },
  methods: {
    findMusic: function(id) {
      fetch(this.url+"/.netlify/functions/musicaFind/"+id,
      { headers: {"Accept": 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.music = items[0];
      })
    },
    updateMusic: function(id) {
      fetch(this.url+"/.netlify/functions/updateTask/"+id,
        { headers: {"Content-Type":"application/json"},
          method: "PUT",
          body: JSON.stringify(this.music)})
        .then((data) => {
          this.$router.push("/musicData");
        }
      )
    },
    createMusic: function() {
      fetch(this.url+"/.netlify/functions/insertTrack",
        { headers: {"Content-Type":"application/json"},
          method: "POST",
          body: JSON.stringify(this.music)})
        .then((data) => {
           this.$router.push("/musicData");
        }
      )
    }
  }
};
</script>