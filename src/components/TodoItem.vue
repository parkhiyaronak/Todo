<template>
  <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
    <!-- Binding class for striking through competed todos-->
    <p>
      <input type="checkbox" :checked="todo.completed" v-on:change="markComplete(todo.id)" />
      {{todo.title}}
      <button @click="$emit('del-todo', todo.id)" class="del">X</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    markComplete(id) {
      this.todo.completed = !this.todo.completed
      const updateTodo = {
        completed: this.todo.completed
      };
      axios.put(`http://localhost:3000/todos/${id}`,updateTodo)
        .then(res =>console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.todo-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.is-complete {
  text-decoration: line-through;
}
.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>