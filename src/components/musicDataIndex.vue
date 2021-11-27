<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
        <th>FileName</th>
        <th>Artista</th>
        <th>Categoria</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='music in musica'>
       <td>{{music.fileName}}</td>
       <td>{{music.artista}}</td>
       <td>{{music.categoria.name}}</td>
       <td>
       <router-link class="button"
         :to="'/musicData/show/'+music._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/musicData/edit/'+music._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteMusic(music._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/musicData/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Musica Index",
  data() {
    return {
      title: 'Lista de musica',
      musica: []
    };
  },
  mounted() {
    this.allMusic()
  },
  methods: {
    allMusic() {
      fetch(this.url+'/.netlify/functions/musicDataFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.musica = items;
        })
     },
     deleteMusic(id) {
       fetch(this.url+'/.netlify/functions/deleteTask/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allMusic();
          }
        )
     }
  }
};
</script>