<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <Header />
        <AddTodo v-on:add-todo="addTodo" />
        <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import axios from "axios";

export default {
  name: "App",
  components: {
    Todos,
    Header,
    AddTodo
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    // To delete todo
    deleteTodo(id) {
      axios
        .delete(`http://localhost:3000/todos/${id}`)
        .then((this.todos = this.todos.filter(todo => todo.id !== id)))
        .catch(err => console.log(err));
    },
    // To add new todo
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      axios
        .post("http://localhost:3000/todos", {
          title,
          completed
        })
        .then(res => (this.todos = [...this.todos, res.data]))
        .catch(err => console.log(err));
    }
  },
  // To list all todos
  created() {
    axios
      .get("http://localhost:3000/todos/")
      .then(res => (this.todos = res.data))
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";

.vertical-centre {
  min-height: 100%;
  display: flex;
  align-items: center;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #4caf50;
  color: #fff;
  padding: 7px 20px;
  margin-bottom: 1rem;
  cursor: pointer;
}

.btn:hover {
  background: rgb(22, 138, 11);
}

.todo-row {
  width: 400px;
}
</style>
