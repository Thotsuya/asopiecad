export default function ProjectsSelect({ projects, onProjectChange }) {
    return (
        <select
            className="form-control"
            name="field"
            onChange={onProjectChange}
        >
            {projects.map((project, index) => (
                <option key={index} value={project.id}>
                    {project.project_name}
                </option>
            ))}
        </select>
    )
}
