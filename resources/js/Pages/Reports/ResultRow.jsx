export default function ResultRow({
                                      result,
                                      headers,
                                      showGoalDescription = true,
                                      highlightIfNotActive = false,
                                      index = null,
                                      isGrouped = false,
                                      consultations_count = 0,
                                  }) {


    const renderResult = () => {

        if(result.id === 19) {
            console.log('result', result)
        }

        if(isGrouped && result.id === 19) return consultations_count

        return result.is_grouped
            ? result.program.total_grouped
            : result
                .goal_total
    }


    if (result.type === 'goal') {
        return <tr className={!result.active && highlightIfNotActive ? 'bg-danger' : ''}>
            {showGoalDescription && <td
                className="text-justify text-sm padding-10"
                style={{
                    minWidth: '400px',
                }}
            >
                {
                    result.goal_description
                }
            </td>}
            <td
                style={{
                    backgroundColor:
                        '#FFFF99',
                }}
                className="text-center text-sm padding-10"
            >
                <strong>
                    {
                        result.goal_target
                    }
                </strong>
            </td>
            <td className="text-center bg-info text-sm padding-10">
                                                            <span className="text-white">
                                                                {
                                                                    parseInt(result.goal_target_year)
                                                                }
                                                            </span>
            </td>
            <td
                title={
                    result.is_grouped
                        ? `Se añadira un valor cada ${result.group_every} registros`
                        : ''
                }
                className="text-center bg-success text-sm padding-10"
            >
                                                            <span className="text-white">
                                                                {renderResult()}
                                                                {result.is_grouped && (
                                                                    <>
                                                                        {' '}
                                                                        <i className="fa fa-group"/>
                                                                    </>
                                                                )}
                                                            </span>
            </td>
            <td className="text-sm text-center padding-10">
                {console.log(result.program)}
                {result.program.total_ungrouped}
            </td>
            <td className="text-sm padding-10">
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-success active"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{
                            width:
                                renderResult().toString() / result.goal_target * 100 + '%',
                        }}
                    >
                                                                    <span>
                                                                        {renderResult().toString() / result.goal_target * 100}
                                                                        %
                                                                    </span>
                    </div>
                </div>
            </td>
            {headers &&
                headers.map(
                    (
                        header,
                        index
                    ) => (
                        <td
                            key={
                                index
                            }
                            style={{
                                backgroundColor:
                                    '#FFFF99',
                            }}
                            className="text-center text-sm padding-10"
                        >
                            <strong>
                                {result.conditions.find(
                                    (
                                        condition
                                    ) =>
                                        condition.label ===
                                        header
                                )
                                    ? result.conditions.find(
                                        (
                                            condition
                                        ) =>
                                            condition.label ===
                                            header
                                    )
                                        .value
                                    : 'N/A'}
                            </strong>
                        </td>
                    )
                )}
            <td className="text-center text-sm padding-10">
                {
                    result.program
                        .visits
                }
            </td>
            <td className="text-center text-sm padding-10">
                <strong>
                    {
                        result
                            .program
                            .total_ungrouped
                    }
                </strong>
            </td>
            <td className="text-center text-sm padding-10">
                <strong>
                    {
                        result
                            .program
                            .pending
                    }
                </strong>
            </td>
        </tr>
    }


    return <tr>
        {showGoalDescription && <td
            className="text-justify text-sm padding-10"
            style={{
                minWidth: '400px',
            }}
        >
            {
                result.goal_description
            }
        </td>}
        <td
            style={{
                backgroundColor:
                    '#FFFF99',
            }}
            className="text-center text-sm padding-10"
        >
            <strong>
                {
                    result.goal_target
                }
            </strong>
        </td>
        <td className="text-center bg-info text-sm padding-10">
            <span className="text-white">
               N/A
            </span>
        </td>
        <td
            className="text-center bg-success text-sm padding-10"
        >
        <span className="text-white">
            {
                result.current_progress
            }
        </span>
        </td>
        <td className="text-sm text-center padding-10">
            {
                result
                    .current_progress
            }
        </td>
        <td className="text-sm padding-10">
            <div className="progress">
                <div
                    className="progress-bar progress-bar-striped progress-bar-success active"
                    role="progressbar"
                    aria-valuenow="40"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                        width:
                            result
                                .completed_percentage +
                            '%',
                    }}
                >
                    <span>
                        {parseInt(
                            result
                                .completed_percentage
                        )}
                        %
                    </span>
                </div>
            </div>
        </td>
        {headers &&
            headers.map(
                (
                    header,
                    index
                ) => (
                    <td
                        key={
                            index
                        }
                        style={{
                            backgroundColor:
                                '#FFFF99',
                        }}
                        className="text-center text-sm padding-10"
                    >
                        <strong>
                            N/A
                        </strong>
                    </td>
                )
            )}
        <td className="text-center text-sm padding-10">
            N/A
        </td>
        <td className="text-center text-sm padding-10">
            <strong>
                {
                    result
                        .current_progress
                }
            </strong>
        </td>
        <td className="text-center text-sm padding-10">
            <strong>
                {
                    result
                        .pending
                }
            </strong>
        </td>
    </tr>
}
