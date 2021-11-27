<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary" 
      to="/">Home</router-link>
    <router-link class="three columns button button-primary" 
      to="/categorias">Categorias</router-link>
          <router-link class="three columns button button-primary" 
      to="/musicData">Music Data</router-link>
  </div>
 <router-view />
  <div class="row">
    <button disabled="disabled" class="twelve columns button-primary">
      Copyright (c) 2021 Proyecto 2 Minor Navarro y Alfredo Vargas
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: "App",
};
</script>
