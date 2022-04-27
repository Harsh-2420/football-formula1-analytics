export const AddTodoForm = ({ todo, onAddFormSubmit, onAddInputChange }) => {
    return (
        <form onSubmit={onAddFormSubmit}>
            <h2>Add Todo</h2>
            <label htmlFor="todo">Create todo: </label>
            <input
                name="todo"
                type="text"
                placeholder="Create new todo"
                value={todo}
                onChange={onAddInputChange}
            />
        </form>
    )
}
