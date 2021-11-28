import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = ({projects}) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            { projects && projects.map( project => {
                return (
                    <ProjectItem project={project} key={project.id} />
                )
            })}
        </div>
    )
}

export default ProjectList