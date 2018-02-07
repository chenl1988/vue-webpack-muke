<template>
<!-- 
    :class 动态的class  
    todo.completed:todo的状态,如果有completed状态增加一个completed的class
-->
  <div :class="['todo-item',todo.completed?'completed':'']">
      <!-- v-model:双向数据绑定 -->
      <input 
        type="checkbox" 
        class="toggle"

        v-model="todo.completed"
        name="" 
        id=""
      />
      <label>{{todo.content}}</label>
      <button class="destory" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
    /* 
        组件之间的数据交互，父组件能过props传进来 
        子组件可以通过事件的方法告诉父组件，要进行某一个操作
    */
  props: {
      todo:{
          type:Object,
          required:true,
      }
  },
  methods:{
      deleteTodo(){
          /*
           通过this.$emit()去触发一个事件 ,事件就是del ,然后将当前要删除的id传回到父组件 todo.vue里面去
           vue的一个机制：父组件会监听所有子组件会触发的事件，一旦触发事件父组件就可以做对应的操作
          
          */
          this.$emit('del',this.todo.id)
      }
  }
}
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        background-color #fff
        &:hover{
            .destory:after{
                content:"x"
            }
        }
        label{
            white-space pre-line
            word-break break-all
            padding 15px 60px 15px 15px
            margin-left 45px
            display block
            line-height 1.2
            transition color 0.4s;
        }
        &.completed{
            label{
                color #d9d9d9
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align center
        width 40px
        height 40px
        position absolute
        top 0
        bottom 0
        margin auto 0
        border 0
       /*  appearance none */
        outline none 
    }
    .destory{
        position absolute
        top 0
        right 10px
        width 40px
        height 40px
        margin auto 0
        font-size 30px
        columns #cc9a9a
        margin-bottom 11px
        transition color 0.7s ease-out
        background-color transparent
        appearance none 
        border-width 0
        cursor pointer
        outline none
    }
</style>
