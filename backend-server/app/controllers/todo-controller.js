'use strict';

const todoService = require('./../services/todo-service');

/**
 * Sets response for fetch all todo.
 *
 * @param request
 * @param response
*/
exports.list = (request, response) => {
    const promise = todoService.fetchAll();
    const result = (todos) => {
        response.status(200);
        response.json(todos);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new todo and sets the response.
 *
 * @param request
 * @param response
*/
exports.save = (request, response) => {
    const todo = Object.assign({}, request.body);  //assign() is js function for cloning
    const result = (savedTodo) => {
        response.status(201);
        response.json(savedTodo);
    };
    const promise = todoService.save(todo);
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Returns todo response.
 *
 * @param request
 * @param response
*/
exports.get = (request, response) => {
    const todoId = request.params.id;
    const promise = todoService.get(todoId);
    promise
        .then(todo => {
                if (!todo) {
                  return response.status(404).json({
                    message: "Item not found in Database for given ID"
                  });
                }
                response.status(200).json(todo);
              })
        .catch(renderErrorResponse(response));
};


/**
 * Updates the todo resource.
 *
 * @param request
 * @param response
*/
exports.update = (request, response) => {
  const itemId = request.params.id;
  const updateditem = Object.assign({}, request.body);
  updateditem.id = itemId;
  updateditem.modifiedDate = new Date().toISOString();
  const promise = todoService.update(updateditem);
  promise
      .then(todo => {
          if (!todo) {
              return response.status(404).json({
                  message: "Item not found in Database for given ID"
              });
          }
          response.status(200).json();
      })
      .catch(renderErrorResponse(response));
};


/**
 * Deletes an todo resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const todoId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = todoService.delete(todoId);
    promise
        .then(todo => {
                if (!todo) {
                  return response.status(404).json({
                    message: "Item not found in Database for given ID"
                  });
                }
                response.status(200).json({
                    message: "Successfully Deleted."
                });
              })
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return errorCallback;
};