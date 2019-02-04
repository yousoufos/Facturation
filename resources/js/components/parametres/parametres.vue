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
            <form @submit.prevent="update">
                <v-layout row wrap>
                    <v-flex xs12 md4 >
                        <v-text-field
                            label="Nom"
                            v-model="information.nom"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Raison"
                            v-model="information.raison"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field
                            label="Matricule"
                            v-model="information.matricule"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                        <v-flex xs12 sm3  >
                            <v-btn class="primary" @click="onPickFile">Telecharger logo</v-btn>
                            <input type="file"
                            style="display:none"
                            ref="fileInput"
                            accept="image/*"
                            @change="onFilePicked">
                        </v-flex>
                        <v-flex xs12 sm6 >
                            <img :src="information.logo" height="100" >
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 >
                            <v-btn class="primary"  :disabled="loadingImg" type="submit">Update</v-btn>
                        </v-flex>

                    </v-layout>

            </form>

        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data(){
        return{
            imageUrl:'',
            image:null

        }


    },
    methods:{
        update(){
            const info={
                id : this.information.id,
                logo : this.information.logo
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
