<template>
  <v-app id="inspire">

	<v-content>
	  <main>
		<router-view :url="url"></router-view>
	  </main>
	</v-content>
  </v-app>
</template>

<script>
export default {
  props: ["url"]
};
</script>
