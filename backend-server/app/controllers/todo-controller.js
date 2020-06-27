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



exports.update = (request, response) => {
  if (request.body.createdDate || request.body.modifiedDate) {
      response.status(500).json({
          message: "createdDate & modifiedDate not required"
      });

  }
  const itemId = request.params.id;
  const updateditem = Object.assign({}, request.body);
  updateditem.id = itemId;
  updateditem.modifiedDate = new Date().toISOString();
  const promise = todoService.update(updateditem);
  promise
      .then(todo => {
          if (!todo) {
              return response.status(404).json({
                  message: "todo not found"
              });
          }
          response.status(200).json();
      })
      .catch(err => {
          err.message;
          response.status(500).json({

              // message: "not proper id formAT"
          });
      });
};
// /**
//  * Updates the todo resource.
//  *
//  * @param request
//  * @param response
// */
// exports.update = (request, response) => {
//     const todoId = request.params.id;
//     const updatedTodo = Object.assign({}, request.body);
//     //console.log("------------before-------");
//     //console.log(updatedTodo);
//     updatedTodo.id = todoId;
//     updatedTodo.modifiedDate = new Date().toISOString();
//    // console.log("-------after----------")
//     //console.log(updatedTodo);
//     // const result = (todo) => {
//     //     response.status(200);
//     //     response.json(todo);
//     // };
//     const promise = todoService.update(updatedTodo);
//     promise
//         .then(todo => {
//                 if (!todo) {
//                   return response.status(404).json({
//                     message: "Item not found in Database for given ID"
//                   });
//                 }
//                 response.status(200).json(todo);
//               })
//         .catch(renderErrorResponse(response));
// };

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