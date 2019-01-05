<template>
    <v-container grid-list-xs>
        <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
           <v-progress-circular indeterminate color="primary">
            </v-progress-circular>
        </v-flex>
    </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                {{ facture.client_id}}
                {{ client.nom }}
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    data(){
        return{

        }
    },

    computed:{

        facture(){
                return this.$store.getters.getFacture(1)


        },
        client(){
            return this.$store.getters.getClient(+this.facture.client_id)
        },
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>

<style>

</style>
