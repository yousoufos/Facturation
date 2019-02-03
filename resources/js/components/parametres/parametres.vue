<template>
<v-container grid-list-xs>
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
                        <v-flex xs12 sm6  >
                            <v-btn class="primary" @click="onPickFile">Upload File</v-btn>
                            <input type="file"
                            style="display:none"
                            ref="fileInput"
                            accept="image/*"
                            @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 >
                            <img :src="information.logo" height="200" >
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 >
                            <v-btn class="primary"  type="submit">Update</v-btn>
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
                    console.log(this.information.logo);


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
        }

    },

}
</script>

<style>

</style>
