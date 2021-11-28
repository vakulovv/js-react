import React from "react";

const ProjectItem = ({project}) => {
    const link = React.createElement(
        'a',
        {className: 'inline-flex items-center justify-center px-3.5 py-1.5 border border-transparent text-base  rounded-md text-white bg-indigo-600 text-cyan-600 hover:text-cyan-700',
                href: 'project/' + project.id,
        },
        'Перейти →'
    );

    return (
        <div className="rounded-lg shadow p-3">
            <h1 className="text-xl m-2 font-medium">{project?.brand?.label}</h1>
            <p className="m-2">{project?.model?.label}</p>
            <div className="m-2 my-4  text-base  ">{link}</div>
        </div>
    )
}

export default ProjectItem