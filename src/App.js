import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import MyTasks from './components/MyTasks'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = uuid()

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [...prevState.myTaskList, {id, taskName, taskCategory}],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = tagId => {
    this.setState({activeTag: tagId})
  }

  render() {
    const {inputTask, selectTag, myTaskList, activeTag} = this.state

    const filterTaskList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)

    return (
      <div className="app-container">
        <div className="form-container">
          <h1 className="heading">Create a Task!</h1>

          <form className="form">
            <label className="task-label" htmlFor="textInput">
              Task
            </label>
            <input
              className="task-input"
              id="textInput"
              type="text"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.onChangeInputTask}
            />
            <label className="tags-label" htmlFor="optionInput">
              Tags
            </label>
            <select
              className="tags-select"
              id="optionInput"
              value={selectTag}
              onChange={this.onChangeSelectTag}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button
              className="add-button"
              type="button"
              onClick={this.onClickAddButton}
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="tags-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => {
              const isActive = activeTag === eachTag.optionId
              const buttonClassName = isActive
                ? 'tags-button active-tag'
                : 'tags-button'

              return (
                <li key={eachTag.optionId} className="tags-items">
                  <button
                    type="button"
                    className={buttonClassName}
                    onClick={() => this.onClickTag(eachTag.optionId)}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <ul className="task-list">
            {filterTaskList.length === 0 ? (
              <p className="no-tasks">No Tasks Added Yet</p>
            ) : (
              filterTaskList.map(eachTask => (
                <MyTasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
