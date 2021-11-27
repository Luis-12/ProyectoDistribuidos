<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
        <th>Name</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='categoria in categorias'>
       <td>{{categoria.name}}</td>
       <td>
       <router-link class="button"
         :to="'/categorias/show/'+categoria._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/categorias/edit/'+categoria._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteCategoria(categoria._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/categorias/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Categorias Index",
  data() {
    return {
      title: 'Lista de Categorias',
      categorias: []
    };
  },
  mounted() {
    this.allCategorias()
  },
  methods: {
    allCategorias() {
      fetch(this.url+'/.netlify/functions/categoriasFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.categorias = items;
        })
     },
     deleteCategoria(id) {
       fetch(this.url+'/.netlify/functions/categoriasDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allCategorias();
          }
        )
     }
  }
};
</script>