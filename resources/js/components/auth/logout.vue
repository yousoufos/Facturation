<template>

</template>

<script>

    export default {
        mounted () {
            if(this.$store.getters.isLogged){

            this.$store.dispatch('logout')
            console.log('logout succee');
            this.$router.push({ name: 'login' })
            }

        }
    }
</script>
