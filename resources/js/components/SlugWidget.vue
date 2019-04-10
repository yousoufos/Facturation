<style scoped>

   .slug-widget{
    display: flex;
    justify-content: flex-start;
    align-items: center;
   }
   .wrapper{
    margin-left: 8px;
   }
   .slug{
    background-color: #fdfd96;
    padding: 3px 5px;
   }
</style>

<template>
   <div class="slug-widget">
       <div class="icon-wrapper wrapper">
           <i class="fa fa-link"></i>
       </div>
        <div class="url-wrapper wrapper">
            <span class="root-url">{{url}}</span
            ><span class="subdirectory-url">/{{subdirectory}}</span
            ><span class="slug" v-show="slug">/{{slug}}</span>
        </div>

        <div class="button-wrapper wrapper">
            <button class="save-slug-button button is-small">Save</button>
        </div>
   </div>
</template>

<script>
import _ from 'lodash'
    export default {
        props:{
            url:{
                type: String,
                required: true,
            },
            subdirectory:{
                type: String,
                required: true,
            },
            title:{
                type: String,
                required: true,
            }
        },
        data: function(){
            return{
                slug: this.convertTitle()
            }
        },
        methods:{
            convertTitle: function(){
                return Slug(this.title)
            }
        },
        watch :{
            title: _.debounce(function(){
                this.slug = this.convertTitle()
            },250),
            slug: function (){
                this.$emit('slugchanged',this.slug)
            }
        },

        mounted() {

        }

    }
</script>
