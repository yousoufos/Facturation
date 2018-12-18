<template>
      <v-flex xs12 md4>
        <v-menu
          ref="menu"
          :close-on-content-click="true"
          v-model="menu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            :label="date_facture"
            persistent-hint
            prepend-icon="event"
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-flex>
</template>
<script>
    export default {
        props:['date_facture'],
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    })
  }
</script>
