<template>
  <div class="col align-self-center">
    <div v-bind:key="todo.id" v-for="todo in todos">
      <TodoItem
        class="col-auto my-1"
        v-bind:todo="todo"
        v-on:del-todo="$emit('del-todo', todo.id)"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "Todos",
  components: {
    TodoItem
  },
  props: ["todos"]
};
</script>

<style scoped>
</style>