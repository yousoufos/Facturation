<template>
<v-container grid-list-md>
    <navigation></navigation>
    <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
           <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title class="primary" >
                    <span class="headline">Societé</span>
                </v-card-title>
                <v-card-text>
                    <form @submit.prevent="update">
                <v-layout row wrap>
                    <v-flex xs12 md4 >
                        <v-text-field
                            label="Nom"
                            v-model="information.nom"
                            ref="nom"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Raison"
                            v-model="information.raison"
                            ref="raison"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Matricule"
                            v-model="information.matricule"
                            ref="matricule"
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
                        <v-btn :disabled="loadingImg" class="primary" @click="onPickFile">Telecharger logo</v-btn>
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
    </v-layout>
</v-container>
</template>

<script>
export default {
    data(){
        return{
            imageUrl:'',
            image:null,
            nom:null

        }


    },
    methods:{
        update(){
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


    },

}
</script>

<style>

</style>
