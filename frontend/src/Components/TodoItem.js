export const TodoItem = ({ todo, onEditClick, onDeleteClick }) => {
    return (
        <li>
            {todo.content}
            <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
        </li>
    )
}
