<!-- .vue文件将会被当做类似html文件处理，而jsx文件会被当做js文件处理 -->
<template>
    <div id="app">
        <div id="cover"></div>
        <!-- 
            声明后的组件可以在template中使用
            这里使用大写对应声明的组件，如果使用小写 “header” 将会被当做html原生标签处理
        -->
        <Header></Header>
        <!-- 由于todo是html里没有标签，所以这里可以直接使用小写 -->
        <todo></todo>
        <Footer></Footer>
    </div>
</template>


<script>
/* 在 app.vue中引入组件 */
import Header from "./todo/header.vue"
import Footer from "./todo/footer.jsx"
import Todo from "./todo/todo.vue"

    export default{
        /* 在app.vue中声明要使用的组件 */
       components:{
           Header,
           Footer,
           Todo,

       }
    }
</script>

<!-- 
    必须写样式的预处理语言 不然后无法用对应的loader处理 
    scoped: 意思是只在这个当前的组件范围内生效
-->
<style lang="stylus" scoped>
    #app{
        position:absolute;
        left:0;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    #cover{
        position:absolute;
        left:0;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color:#999;
        opacity:.9;
        z-index:-1;
    }
</style>