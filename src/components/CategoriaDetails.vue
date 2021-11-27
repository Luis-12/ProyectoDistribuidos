<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Name</label>
       <input class="u-full-width" type="text"
         v-model="categoria.name">
      </div>
     </div>

     <div class="row">
      <router-link class="button button-primary" 
        to="/categorias">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateCategoria(categoria._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createCategoria()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Categorias Details",
  props: ["create","edit","create"],
  data() {
    return {
      title: "Categorias Data",
      categoria: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findCategoria(route.params.id);
    else {
      this.categoria = {
        "_id": Math.floor(Math.random()*100000000),"name":"" };
    }
  },
  methods: {
    findCategoria: function(id) {
      fetch(this.url+"/.netlify/functions/categoriasFind/"+id,
      { headers: {"Accept": 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.categoria = items[0];
      })
    },
    updateCategoria: function(id) {
      fetch(this.url+"/.netlify/functions/categoriasUpdate/"+id,
        { headers: {"Content-Type":"application/json"},
          method: "PUT",
          body: JSON.stringify(this.categoria)})
        .then((data) => {
          this.$router.push("/categorias");
        }
      )
    },
    createCategoria: function() {
      fetch(this.url+"/.netlify/functions/categoriasInsert",
        { headers: {"Content-Type":"application/json"},
          method: "POST",
          body: JSON.stringify(this.categoria)})
        .then((data) => {
           this.$router.push("/categorias");
        }
      )
    }
  }
};
</script>