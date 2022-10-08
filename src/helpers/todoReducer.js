const todoReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return [...action.initTodos];
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          todo: action.todo,
          isCompleted: false,
          userId: action.userId,
        },
      ];
    case 'TOGGLE':
      return state.map(task =>
        task.id === action.id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
    case 'REMOVE':
      return state.filter(task => task.id !== action.id);
    case 'EDIT':
      return state.map(task =>
        task.id === action.id ? { ...task, todo: action.todo } : task
      );
    default:
      return state;
  }
};

export default todoReducer;
