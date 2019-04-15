<template>
    <v-container grid-list-xs>
        <navigation></navigation>
        <div>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline mb-0">{{ fullDate }}</h3>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
    </v-container>
</template>

<script>
export default {
    timers: {
    updateTime: { time: 1000, autostart: true ,repeat: Boolean}
  },
    data() {
      return {
          time:null,
          date:null,
          fullDate:null,
      }
      },
      methods:{
          updateTime(){
          var cd = new Date()
          this.date=this.zeroPadding(cd.getDate(),2)+'-'+this.zeroPadding(cd.getMonth()+1,2)+'-'+this.zeroPadding(cd.getFullYear(),4)
          this.time=this.zeroPadding(cd.getHours(),2)+':'+this.zeroPadding(cd.getMinutes(),2)+':'+this.zeroPadding(cd.getSeconds(),2)
          this.fullDate=this.date+' '+this.time

      },
      zeroPadding(num,digit){
          var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
      }

      }

}
</script>

<style>

</style>
