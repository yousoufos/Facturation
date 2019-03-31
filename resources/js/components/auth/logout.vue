<template>

</template>

<script>

    export default {
        mounted () {
            localStorage.removeItem('token')
            this.$store.commit('logoutUser')
            console.log('logout succee');

            this.$router.push({ name: 'login' })
        }
    }
</script>
