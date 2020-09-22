<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Nicholas Sparks</span>
        <div class="md-toolbar-section-end" v-if="authenticated">
          <md-autocomplete
            class="searchbar"
            md-layout="box"
            v-model="selectedBook"
            :md-options="searchOptions"
            @md-changed="search"
            @md-selected="select"
          >
            <label>Cerca libri</label>
          </md-autocomplete>
          <md-button class="md-icon-button" @click="logout()">
            <md-icon>exit_to_app</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">Menu
        <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = false">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
        </div>
        </md-toolbar>
        <md-list>
           <md-list-item to="/home">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item to="/libri">
            <md-icon>menu_book</md-icon>
            <span class="md-list-item-text">Libri</span>
          </md-list-item>

          <md-list-item to="/film">
            <md-icon>theaters</md-icon>
            <span class="md-list-item-text">Film</span>
          </md-list-item>

          <md-list-item>
            <md-icon>search</md-icon>
            <span class="md-list-item-text">Ricerca Avanzata</span>
          </md-list-item>

          <md-list-item>
            <md-icon>favorite</md-icon>
            <span class="md-list-item-text">Preferiti</span>
          </md-list-item>

          <md-list-item>
            <md-icon>mail</md-icon>
            <span class="md-list-item-text">Contattaci</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
         
        <router-view>
        
        <md-card>
          <md-card-media>
             <!--<img src="./assets/card-image-1.jpg" alt="People">-->
          </md-card-media>

          <md-card-header>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <div>
                <md-button>Action</md-button>
                <md-button>Action</md-button>
              </div>

              <md-card-expand-trigger>
                <md-button class="md-icon-button">
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.</md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card>
        </router-view>

      </md-app-content>
    </md-app>
  </div>
</template>

<style>
.md-app {
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<style>
.card-expansion {
  height: 480px;
}

.md-card {
  height: auto;
  width: 280px;
  margin: 10px;
  display: inline-block;
  vertical-align: bottom;
}
.md-app-content {
  height: 900px;
}
</style>

<script>
export default {
  name: "Reveal",
  data: () => ({
    menuVisible: false
  })
};
</script>

<script>
import DataService from "./dataservice";

export default {
  name: "App",
  data: function() {
    return {
      menuVisible: false,
      authenticated: DataService.isAuthenticated(),
      selectedBook: null,
      searchOptions: []
    };
  },
  watch: {
    $route: function() {
      this.authenticated = DataService.isAuthenticated();
    }
  },
  components: {},
  methods: {
    search: function(term) {
      this.searchOptions = DataService.searchBook(term);
    },
    select: function(selected) {
      if (selected === this.$route.params.titolo) return;
      this.$router.push({ path: "/dettaglio/" + selected});
    },
    logout: function() {
      DataService.logout();
      this.$router.push({ path: "/Login" });
    }
  }
};
</script>

<style>
.searchbar {
  max-width: 300px;
}
</style>