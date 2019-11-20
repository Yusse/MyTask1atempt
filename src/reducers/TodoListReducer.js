import { handleActions } from 'redux-actions'
import { fromJS, List } from 'immutable'
import { STORE } from '../action_types'
import { reorder } from '../utils'

// const todo= {
//     desc:String,
//     file:String,
//     deadline:TimeStamp,
//     todoText:String,
//     highlighted:boolean,
//     comment:String,
//     isComplete: boolean,
// }

const processHighLightedTodo = (index, currTodosArr) => {
  const newTodos = [...currTodosArr]

  const isHighlighted = newTodos[index]['highlighted']

  const changeTo = isHighlighted ? false : true

  newTodos[index]['highlighted'] = changeTo

  if (changeTo) {
    return reorder(newTodos, index, 0)
  }
  return reorder(newTodos, index, newTodos.length - 1)
}

const processCompleteTodo = (index, currTodosArr) => {
  const newTodos = [...currTodosArr]

  const isComplete = newTodos[index]['isComplete']

  const changeTo = isComplete ? false : true

  newTodos[index]['isComplete'] = changeTo

  if (changeTo) {
    return reorder(newTodos, index, newTodos.length - 1)
  }
  return reorder(newTodos, index, 0)
}

const processUpdateTodo = (newTodo, state, index) => {
  const newTodos = [...state]

  newTodos[index] = newTodo

  return newTodos
}

const {
  GET_INIT_TODO_DATA,
  REORDER_TODOS,
  HIGHLIGHT_TODO,
  MARK_ONE_TODO_IS_COMPLETE,
  ADD_TODO,
  UPDATE_TODO,
} = STORE

const TodoSReducerStrategy = {
  GET_INIT_TODO_DATA: (state, { payload }) => List.of(...payload),
  REORDER_TODOS: (state, { payload }) => List.of(...payload),
  HIGHLIGHT_TODO: (state, { payload }) =>
    processHighLightedTodo(payload, state),
  MARK_ONE_TODO_IS_COMPLETE: (state, { payload }) =>
    processCompleteTodo(payload, state),
  ADD_TODO: (state, { payload }) => [...state, payload],
  UPDATE_TODO: (state, { payload }) =>
    processUpdateTodo(payload.todoData, state, payload.todoIndex),
}

export default handleActions(TodoSReducerStrategy, List())
