<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        />
        <!-- 
            将todo传进到item组件中 
            父组件监听子组件事件del，并绑定
        -->
        <item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <!-- 将filter传进到tabs组件中,将整个todos列表传入 -->
        <tabs
            :filter="filter"
            :todos="todos" 
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
import Item from "../todo/item.vue"
import Tabs from "../todo/tabs.vue"

let id = 0
    export default{
        /* 数据声明，数据在哪里声明就在哪里使用，不要在下层的组件中操作，容易导致一些错误 */
        data(){
            return{
                todos:[],
                filter:'all'
            }
        },
        components:{
            Item,
            Tabs
        },
        computed:{
            /* 根据 state 计算 todos 中的内容是否显示 */
            filteredTodos(){
                if(this.filter === 'all'){
                    return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => completed ===todo.completed)

            }
        },
        methods: {
            addTodo(e){
                /* 
                    插入到数组中的第一项 
                    如果结束了是true,没有结束是false 一开始是没有结束的
                */
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed:false
                })
                /* 每次插入后清空 */
                e.target.value=""
            },
            deleteTodo(id){
                /* 截取数据，使用findIndex()方法，并传入一个方法，参数为todo 判断传入的id等于数据中的一个就截取掉*/
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
            },
            toggleFilter(state){
                this.filter=state
            },
            clearAllCompleted(){
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app{
        width 600px
        margin: 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        width 100%
        font-size 24px
        font-family inherit;
        font-weight inherit;
        line-height 1.4em;
        border:0
        outline 0
        color inherit 
        padding 6px
        border 1px solid #999
        box-shadow inset 0 -1px 5px  rgba(0,0,0 0.8)
        box-sizing border-box
        font-smoothing:antialiased;
        padding: 16px 16px 16px 60px
        border:none;
        box-shadow inset 0 -2px 1px rgba(0,0,0,0.8) 
    }
</style>
