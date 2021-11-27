import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import CategoriaIndex from "./components/CategoriaIndex.vue";
import CategoriaDetails from "./components/CategoriaDetails.vue";
import MusicIndex from "./components/musicDataIndex.vue";
import MusicDetails from "./components/musicDataDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/categorias", component: CategoriaIndex },
  { path: "/categorias/show/:id", 
    component: CategoriaDetails, props: {show:true} },
  { path: "/categorias/edit/:id", 
    component: CategoriaDetails, props: {edit:true} },
  { path: "/categorias/create", 
    component: CategoriaDetails, props: {create:true} },
  { path: "/categorias/delete/:id", 
    component: CategoriaDetails, props: {delete:true} },

    { path: "/musicData", component: MusicIndex },
    { path: "/musicData/show/:id", 
      component: MusicDetails, props: {show:true} },
    { path: "/musicData/edit/:id", 
      component: MusicDetails, props: {edit:true} },
    { path: "/musicData/create", 
      component: MusicDetails, props: {create:true} },
    { path: "/musicData/delete/:id", 
      component: MusicDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;