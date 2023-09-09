import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProjectItems from './components/ProjectItems'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const consonantsApi = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'In_PROGRESS',
  failure: 'FAILURE',
}
// Replace your code here
class App extends Component {
  state = {sv: categoriesList[0].id, apiStatus: consonantsApi.initial, data: []}

  componentDidMount() {
    this.getProjects()
  }

  onSelect = e => {
    this.setState({sv: e.target.value}, this.getProjects)
  }

  formatData = e => ({
    id: e.id,
    name: e.name,
    imageUrl: e.image_url,
  })

  getProjects = async () => {
    this.setState({apiStatus: consonantsApi.inProgress})
    const {sv} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${sv}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const fd = await response.json()
      const ud = await fd.projects.map(e => this.formatData(e))
      console.log(ud)
      this.setState({data: ud, apiStatus: consonantsApi.success})
    } else {
      this.setState({apiStatus: consonantsApi.failure})
    }
  }

  renderProjects = () => {
    const {data} = this.state
    return (
      <ul>
        {data.map(ep => (
          <ProjectItems key={ep.id} p={ep} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="f-v">
      <img
        className="f-img"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="f-btn" onClick={this.getProjects}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="projects-details-loader">
      <Loader type="ThreeDots" color="#328af2" height="80" width="80" />
    </div>
  )

  renderPageDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case consonantsApi.success:
        return this.renderProjects()
      case consonantsApi.failure:
        return this.renderFailureView()
      case consonantsApi.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="s-section">
          <select onChange={this.onSelect}>
            {categoriesList.map(e => (
              <option key={e.id} value={e.id}>
                {e.displayText}
              </option>
            ))}
          </select>
        </div>
        {this.renderPageDetailsView()}
      </div>
    )
  }
}

export default App
