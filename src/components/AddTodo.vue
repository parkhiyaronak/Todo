<template>
  <div class="col align-self-center">
    <form class="sign-in" @submit="addTodo">
      <div class="form-group todo-row">
        <input
          type="text"
          required
          class="form-control"
          v-model="title"
          name="title"
          placeholder="Add your Todos.."
        />
      </div>&nbsp;&nbsp;
      <input type="submit" value="Add it!" class="btn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault(); //As we dont want form to submit
      const newTodo = {
        title: this.title,
        completed: false
      };
      //send this to parent
      this.$emit("add-todo", newTodo);
      this.title = ""; //reseting the input text field
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 10px;
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

input[type="submit"] {
  flex: 2;
}
</style>