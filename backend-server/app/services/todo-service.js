'use strict';
const mongoose = require('mongoose'),
Todo = mongoose.model('todo'); //Mongoose comes with prebuild functions
//2 popular design pattern to access the data

// Active recorde pattern: binds model object, injects the function to manipulate the database (to Save, to update, to create object)
// data mapper paatern: write seperate class th handle those for you

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.fetchAll = () => {
    const promise = Todo.find().exec();
    return promise;
};

/**
 * Saves the new Todo object.
 *
 * @param Todo
*/
exports.save = (todo) => {
    const newTodo = new Todo(todo);
    return newTodo.save();
};

/**
 * Returns the todo object by id.
 *
 * @param todoId
*/
exports.get = (todoId) => {
    const todoPromise = Todo.findById(todoId).exec();
    return todoPromise;
};

/**
 * Updates an existing todo.
 *
 * @param updatedTodo
*/
exports.update = (updatedTodo) => {
    //console.log(updatedTodo);
    const promise = Todo.findByIdAndUpdate({
        _id:updatedTodo.id}, updatedTodo).exec();
    return promise;
};

/**
 * Deletes an existing todo.
 *
 * @param todoId
*/
exports.delete = (todoId) => {
    const promise = Todo.findByIdAndRemove(todoId).exec();
    return promise;
};


//console.log('Inside Services');