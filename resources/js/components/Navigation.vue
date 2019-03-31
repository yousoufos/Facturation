<template>
    <v-navigation-drawer app stateless value="true" class="blue-grey lighten-3" width="250" fixed>
	  <v-list>
		<v-list-tile :to="'/facturation'">
		  <v-list-tile-action>
			<v-icon>home</v-icon>
		  </v-list-tile-action>
		  <v-list-tile-title>Home</v-list-tile-title>
		</v-list-tile>


		  <!-- <v-list-tile slot="activator">
			<v-list-tile-title>Users</v-list-tile-title>
		  </v-list-tile> -->

		  <v-list-group no-action sub-group value="true">
			<v-list-tile slot="activator">
			  <v-list-tile-title>Admin</v-list-tile-title>
			</v-list-tile>

			<v-list-tile v-for="(menu, i) in admins" :key="i" :to="menu.link">
			  <v-list-tile-title v-text="menu.title"></v-list-tile-title>
			  <v-list-tile-action>
				<v-icon v-text="menu.icon"></v-icon>
			  </v-list-tile-action>
			</v-list-tile>
		  </v-list-group>

		  <v-list-group sub-group no-action>
			<v-list-tile slot="activator">
			  <v-list-tile-title>Facturation</v-list-tile-title>
			</v-list-tile>

			<v-list-tile v-for="(menu, i) in menu_facturation" :key="i" :to="menu.link">
			  <v-list-tile-title v-text="menu.title"></v-list-tile-title>
			  <v-list-tile-action>
				<v-icon v-text="menu.icon"></v-icon>
			  </v-list-tile-action>
			</v-list-tile>

		  </v-list-group>
          <v-list-group sub-group no-action>
			<v-list-tile slot="activator">
			  <v-list-tile-title>Produits</v-list-tile-title>
			</v-list-tile>

			<v-list-tile v-for="(menu, i) in menu_produit" :key="i" :to="menu.link">
			  <v-list-tile-title v-text="menu.title"></v-list-tile-title>
			  <v-list-tile-action>
				<v-icon v-text="menu.icon"></v-icon>
			  </v-list-tile-action>
			</v-list-tile>

		  </v-list-group>
          <v-list-group sub-group no-action>
			<v-list-tile slot="activator">
			  <v-list-tile-title>Clients</v-list-tile-title>
			</v-list-tile>

			<v-list-tile v-for="(menu, i) in menu_client" :key="i" :to="menu.link">
			  <v-list-tile-title v-text="menu.title"></v-list-tile-title>
			  <v-list-tile-action>
				<v-icon v-text="menu.icon"></v-icon>
			  </v-list-tile-action>
			</v-list-tile>

		  </v-list-group>
          <v-list-group sub-group no-action v-if="isLogged" >
			<v-list-tile slot="activator">
			  <v-list-tile-title>Bonjour, {{ loggedUser.name }}</v-list-tile-title>
			</v-list-tile>

			<v-list-tile v-for="(menu, i) in menu_auth" :key="i" :to="menu.link">
			  <v-list-tile-title v-text="menu.title"></v-list-tile-title>
			  <v-list-tile-action>
				<v-icon v-text="menu.icon"></v-icon>
			  </v-list-tile-action>
			</v-list-tile>

		  </v-list-group>

	  </v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
props: ["url"],
  data: () => ({
	admins: [
        { icon: "settings", title: "Parametres", link: "/facturation/parametres" },]
        ,

	menu_facturation: [
		{ icon: "dehaze", title: "Lister", link: "/facturation/liste" },
		{ icon: "add", title: "Creer", link: "/facturation/create" },
    ],
    menu_produit:[
        {icon:"dehaze", title:"Lister",link:"/facturation/produit/liste"}
    ],
    menu_client:[
        {icon:"dehaze", title:"Lister",link:"/facturation/client/liste"}
    ],
    menu_auth:[
        {icon:"dehaze", title:"Logout",link:"/facturation/logout"}
    ]
  }),
  computed: {
      isLogged(){
          return this.$store.getters.isLogged
      },
      loggedUser(){
          return this.$store.getters.getLoggedUser
      }
  },
  methods: {}
}
</script>

<style>

</style>
