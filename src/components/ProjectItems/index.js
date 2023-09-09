import './index.css'

const ProjectItems = props => {
  const {p} = props
  const {name, imageUrl} = p
  return (
    <li>
      <img className="p-img" src={imageUrl} alt={name} />
      <p className="p-name">{name}</p>
    </li>
  )
}
export default ProjectItems
