export default function ScreeningsRow({screenings}){
    return (
        <tr>
            <td className="text-justify text-sm padding-10">
                {screenings.title}
            </td>
            <td
                className="text-center text-sm padding-10"
                style={{
                    backgroundColor:
                        '#FFFF99',
                }}
            >
                <strong>
                    {screenings.goal}
                </strong>
            </td>
            <td className="text-center bg-info text-sm padding-10">
                                                            <span className="text-white">
                                                                N/A
                                                            </span>
            </td>
            <td className="text-center bg-success text-sm padding-10">
                                                <span className="text-white">
                                                    {screenings.total_screenings}
                                                </span>
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
                                screenings.completed_percentage +
                                '%',
                        }}
                    >
                                                                    <span>
                                                                        {parseInt(
                                                                            screenings.completed_percentage
                                                                        )}
                                                                        %
                                                                    </span>
                    </div>
                </div>
            </td>
            <td className="text-center text-sm padding-10">
                0
            </td>
            <td className="text-center text-sm padding-10">
                0
            </td>
            <td className="text-center text-sm padding-10">
               0
            </td>
            <td className="text-center text-sm padding-10">
                0
            </td>
            <td className="text-center text-sm padding-10">
                {screenings.males_below_18_without_disabilities}
            </td>
            <td className="text-center text-sm padding-10">
                {screenings.females_below_18_without_disabilities}
            </td>
            <td className="text-center text-sm padding-10">
                0
            </td>
            <td className="text-center text-sm padding-10">
                0
            </td>
            <td className="text-center text-sm padding-10">
                N/A
            </td>
            <td className="text-center text-sm padding-10">
                <strong>
                    {screenings.total_screenings}
                </strong>
            </td>
            <td className="text-center text-sm padding-10">
                {
                    7200 - screenings.total_screenings
                }
            </td>
        </tr>
    )
}
