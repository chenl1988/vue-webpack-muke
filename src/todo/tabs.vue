<template>
  <div class="helper">
      <span class="left">{{unFinishedTodoLength}} items left</span>
      <span class="tabs">
          <!-- 
              :key 唯一的key标明（循环耗资源，提高性能），数据变动时下一次循环如果有key的节点会复用，不会创建一个新的节点
              filter:代表选中的状态,是从一层的组件传过来的
              toggleFilter():会在todo.vue中声明，因为是整个应用的一个状态，将当前选中的做为参数传入
          -->
          <span
            v-for="state in states"
            :key="state"
            :class="[state,filter === state ? 'actived' : '']"
            @click="toggleFilter(state)"
          >
              {{state}}
          </span>
      </span>
      <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
    export default{
        /* 从父组件接收到的参数 */
        props:{
            filter:{
                type:String,/* 接收到参数的类型 */
                required:true,/*required必须要传，不然没办法进行判断  */
            },
            todos:{
                type:Array,
                required:true
            }
        },
        data(){
            return{
                states:['all','active','completed']
            }
        },
        /* vue的计算属性 */
        computed:{
            unFinishedTodoLength(){
                /* 在todos数据当中过滤出 computed为true的todo，并且取出filter返回数组的长度*/
                return this.todos.filter(todo => !todo.computed).length
            }
        },
        methods: {
            clearAllCompleted(){
                this.$emit('clearAllCompleted')
            },
            /* 根据状态过滤数据 */
            toggleFilter(state){
                this.$emit('toggle',state)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .helper{
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        font-smoothing:antialiased
    }
    .left,.clear,.tabs{
        padding 0 10px
        box-sizing border-box
    }
    .left,.clear{
        width 150px
    }
    .left{
        text-align center
    }
    .clear{
        text-align center 
        cursor pointer
    }
    .tabs{
        width 200
        display flex
        justify-content  space-around
        *{
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175,47,47 0)
            &.actived{
                border-color rgba(175,47,47,0.4)
                border-radius 5px
            }
        }
    }
</style>
