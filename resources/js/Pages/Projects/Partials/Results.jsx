import ResultsCreate from "@/Pages/Projects/Partials/ResultsCreate";

export default function ResultsTab({project,goals}){
    return (
        <div
            className="tab-pane fade"
            role="tabpanel"
            id="results"
            aria-labelledby="results-tab"
        >
            <div className="row">
                <ResultsCreate project={project} goals={goals}/>

                <div className="col-md-7">
                    <div className="box-content">
                        <h4 className="box-title">Resultados</h4>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Resultado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {project.grouped_results.length > 0 ? (
                                    project.grouped_results.map((result, index) => (
                                        <tr key={`result-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{result.title}</td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-danger">
                                                    <i className="fa fa-trash"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No hay resultados registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
