<template>
    <v-container grid-list-xs>
      <v-layout
      row
      wrap
      v-if="loading"
    >
      <v-flex
        xs12
        class="text-xs-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <div  v-else>
        <v-layout>
      <v-flex xs12>
        <v-btn
          color="success"
          @click="addProduct"
          block
        >Nouveau Produit</v-btn>
      </v-flex>
    </v-layout>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau Produit</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Code Produit" v-model="codeProduit" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Designation" v-model="designation" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Prix" v-model="prix" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
          :items="listTva"
          item-text="value"
          item-value="value"
          label="Tva"
          v-model="tva"
        ></v-select>
        </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
        <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="produits"
          class="elevation-1"
          item-key="id"
          loading="true"
          :rows-per-page-items="[25,50]"
          disable-initial-sort


        >
          <template
            slot="items"
            slot-scope="props"
          >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.code }} </td>
            <td class="text-xs-left">{{ props.item.designation }}</td>
            <td class="text-xs-left">{{ props.item.prix }}</td>
            <td class="text-xs-left">{{ props.item.tva }}</td>
            <td class="justify-center ">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    </div>

  </v-container>
</template>

<script>
export default {
    data () {
    return {
        codeProduit:null,
        designation:null,
        prix:null,
        tva:null,
        dialog:false,
      headers: [
        {
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Code", value: "code" },
        { text: "Designation", value: "designation" },
        { text: "Prix", value: "prix" },
        { text: "TVA", value: "tva" },
        { text: "Actions", value: "name", sortable: false }
      ],
    }
    },
    methods:{
        addProduct(){
            this.dialog = true
            this.clearFields()
        },
        saveProduct(){
             let produit={
                code:this.codeProduit,
                designation:this.designation,
                prix:this.prix,
                tva:this.tva
            }
            this.$store.dispatch('saveProduit',produit)
            this.dialog = false

        },
        clearFields(){
            this.codeProduit=null,
            this.designation=null,
            this.prix=null,
            this.tva=null
        }
    },
    computed: {
      produits(){
          return this.$store.getters.getloadedProduits
      },
      loading(){
          return this.$store.getters.loading;
      },
      listTva(){
          return this.$store.getters.getLoadedTva
      }


  }
}
</script>

<style>

</style>
