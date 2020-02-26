const mapStateToProps = state => {
    return {
        todos: [],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id));
        },
    };
};
