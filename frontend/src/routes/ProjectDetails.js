import React from 'react'
import ProjectDetails from '../components/project-detail/ProjectDetails'

const ProjectDetailsRoute = props => {
  const projectId = props.match.params.id

  if (!projectId) return null

  return <ProjectDetails projectId={projectId} />
}

export default ProjectDetailsRoute
