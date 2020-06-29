<template>
  <div class="input-group mb-3 todo-item" v-bind:class="{'is-complete':todo.completed}">
    <div class="input-group-prepend">
      <span class="input-group-text update" id="basic-addon1">
        <input type="checkbox" :checked="todo.completed" v-on:change="markComplete(todo.id)" />
      </span>
    </div>
    <input
      type="text"
      v-model="todo.title"
      required
      class="form-control"
      @keyup.enter="updateTodo(todo)"
      name="title"
    />
    <div class="input-group-append">
      <span class="input-group-text update" v-on:click="updateTodo(todo)">&#9998;</span>
      <span class="input-group-text del" @click="$emit('del-todo', todo.id)">X</span>
    </div>
    <!-- <button @click="$emit('del-todo', todo.id)" class="del">X</button> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    markComplete(id) {
      this.todo.completed = !this.todo.completed;
      const completeTodo = {
        completed: this.todo.completed
      };
      axios
        .put(`http://localhost:3000/todos/${id}`, completeTodo)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    updateTodo(todo) {
      const updateTodo = {
        title: todo.title
      };
      axios
        .put(`http://localhost:3000/todos/${todo.id}`, updateTodo)
        .then(res => console.log(res))
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
.update {
  background: #5388b4;
  color: #fff;
  border: none;
  cursor: pointer;
}
.del {
  background: #ff4141;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
