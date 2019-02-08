<template>
<v-container grid-list-md>
    <navigation></navigation>
    <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
           <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
        </v-flex>
    </v-layout>
    <div v-else>
    <v-layout row wrap >
        <v-dialog v-model="dialog" persistent max-width="600px">
        <form>
      <v-card>
        <v-card-title>
          <span class="headline">Nouvelle valuer TVA</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Valeur" v-model="newTva"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveTva">Save</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
    <v-dialog v-model="dialogReglement" persistent max-width="600px">
        <form>
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau Mode de reglement</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Valeur" v-model="newReglement"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogReglement = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveReglement">Save</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title class="primary" >
                    <span class="headline">Parametres de la Societé</span>
                </v-card-title>
                <v-card-text>
                    <form @submit.prevent="update">
                <v-layout row wrap>
                    <v-flex xs12 md4 >
                        <v-text-field
                            label="Nom"
                            v-model="information.nom"
                            ref="nom"
                            v-validate="'required'" data-vv-name="nom" :error-messages="errors.collect('nom')"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Raison"
                            v-model="information.raison"
                            ref="raison"
                             v-validate="'required'" data-vv-name="raison" :error-messages="errors.collect('raison')"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Matricule"
                            v-model="information.matricule"
                            ref="matricule"
                            v-validate="'required'" data-vv-name="matricule" :error-messages="errors.collect('matricule')"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 md4 >
                        <v-text-field
                            label="Registre du commerce"
                            v-model="information.registre"
                            ref="registre"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="RIB"
                            v-model="information.rib"
                            ref="rib"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Email"
                            v-model="information.email"
                            ref="email"
                            v-validate="'email'" data-vv-name="email" :error-messages="errors.collect('email')"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 md4 >
                        <v-text-field
                            label="Telephone"
                            v-model="information.tel"
                            ref="tel"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-textarea box rows="5" label="Adresse" v-model="information.adresse" ref="adresse">

                        </v-textarea>
                    </v-flex>
                    <v-flex md2>
                        <v-btn :disabled="loadingImg" class="primary" @click="onPickFile">Logo</v-btn>
                            <input type="file"
                            style="display:none"
                            ref="fileInput"
                            accept="image/*"
                            @change="onFilePicked">
                    </v-flex>
                    <v-flex md2>
                        <img :src="information.logo" height="100" >
                    </v-flex>
                </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 >
                            <v-btn class="primary"  :disabled="loadingImg" type="submit">Update</v-btn>
                        </v-flex>

                    </v-layout>

            </form>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 mt-5>
            <v-card>
                <v-card-title primary-title class="primary">
                    <span class="headline">Parametres de facturation</span>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-card>

                                <v-toolbar color="light-blue" dark>
                                <v-toolbar-title>Tva %</v-toolbar-title>

                                <v-spacer></v-spacer>
                                <v-btn icon class="white" @click="addTva">
                                    <v-icon fab	dark color="indigo">add</v-icon>
                                </v-btn>
                                </v-toolbar>
                                <template>
  <v-progress-linear v-if=" loadingTva" :indeterminate="loadingTva"></v-progress-linear>
</template>
                                 <v-list-tile
                                    v-for="item in tva"
                                    :key="item.id"                                >
                                <v-list-tile-content>
                                <v-list-tile-title>{{ item.value }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                <v-btn icon ripple @click="deleteTva(item.id)">
                                    <v-icon color="grey lighten-1">delete</v-icon>
                                </v-btn>
                                </v-list-tile-action>
                                </v-list-tile>
                            </v-card>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-card>

                                <v-toolbar color="light-blue" dark>
                                <v-toolbar-title>Mode Reglement</v-toolbar-title>

                                <v-spacer></v-spacer>
                                <v-btn icon class="white" @click="addReglement">
                                    <v-icon fab	dark color="indigo">add</v-icon>
                                </v-btn>
                                </v-toolbar>
                                <template>
  <v-progress-linear v-if=" loadingReglement" :indeterminate="loadingReglement"></v-progress-linear>
</template>
                                 <v-list-tile
                                    v-for="item in reglements"
                                    :key="item.id"                                >
                                <v-list-tile-content>
                                <v-list-tile-title>{{ item.modeReglement }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                <v-btn icon ripple @click="deleteReglement(item.id)">
                                    <v-icon color="grey lighten-1">delete</v-icon>
                                </v-btn>
                                </v-list-tile-action>
                                </v-list-tile>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    </div>
</v-container>
</template>

<script>

export default {
    $_veeValidate: {
      validator: 'new'
    },
     mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    data(){
        return{
            imageUrl:'',
            image:null,
            nom:null,
            newTva:null,
            dialog:false,
            dialogReglement:false,
            newReglement:null,
            dictionary: {
            custom: {
          nom: {
            required:'Champs requis',
          },
          raison: {
            required: 'Champs requis'
          },
          matricule:{
              required: 'Champs requis'
          },
          tel:{
              required: 'Champs requis'
          },
          adresse:{
              required: 'Champs requis'
          },
          email:{
               required: 'Champs requis',
               email:"Entrez un email valide"
          },

        }

        }
        }


    },
    methods:{
        update(){
            this.$validator.validate().then(result=>{
               if(result){
                   let info ={
                id : this.information.id,
                nom : this.$refs.nom.value,
                matricule : this.$refs.matricule.value,
                registre : this.$refs.registre.value,
                raison : this.$refs.raison.value,
                email : this.$refs.email.value,
                adresse : this.$refs.adresse.value,
                tel : this.$refs.tel.value,
                rib : this.$refs.rib.value,
                logo : this.information.logo,
                  }
                this.$store.dispatch('updateInformation',info)
               }
           });


        },
        onPickFile(){
                this.$refs.fileInput.click()
            },
        onFilePicked(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                this.$store.dispatch('editLogo',e.target.result)
            };
            reader.readAsDataURL(file);
        },
        deleteTva(id){
            this.$store.dispatch('deleteTva',id)
        },
        deleteReglement(id){
            this.$store.dispatch('deleteModeReglement',id)
        },
        saveTva(){
            let obj={
                value:this.newTva
            }
            this.$store.dispatch('addTva',obj)
            this.dialog=false

        },
        saveReglement(){
            let obj={
                modeReglement:this.newReglement
            }
            this.$store.dispatch('addModeReglement',obj)
            this.dialogReglement=false

        },
        addTva(){
            this.dialog=true
            this.newTva=null
        },
        addReglement(){
            this.dialogReglement=true
            this.newReglement=null
        },


    },
    computed:{
        information(){
            return this.$store.getters.getInformation
        },
        loading(){
            return this.$store.getters.loading
        },
        loadingImg(){
            return this.$store.getters.getLoadingTable
        },
        loadingTva(){
             return this.$store.getters.getLoadingTva
        },
        loadingReglement(){
            return this.$store.getters.getLoadingReglement
        },
        tva(){
            return this.$store.getters.getLoadedTva
        },
        reglements(){
            return this.$store.getters.getLoadedModeReglement
        },


    },

}
</script>

<style>

</style>
