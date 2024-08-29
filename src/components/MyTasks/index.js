import './index.css'

const MyTasks = props => {
  const {taskDetails, isActive} = props
  const {taskName, taskCategory} = taskDetails

  return (
    <li className="task-item">
      <p className="task-name">{taskName}</p>
      <p className="task-category">{taskCategory}</p>
    </li>
  )
}

export default MyTasks
