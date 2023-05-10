import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

export default function AgeChart({ screenings_per_age }) {
    ChartJS.register(
        ArcElement,
        BarElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Tamizajes por Edad',
            },
        },
    }

    const data = {
        // Capitalize first letter
        labels: screenings_per_age.map(
            (screening) =>
                screening.label.charAt(0).toUpperCase() +
                screening.label.slice(1)
        ),
        datasets: [
            {
                label: 'Tamizajes por Edad',
                data: screenings_per_age.map((screening) => screening.value),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return (
        <div className="col-md-12">
            <div className="box-content">
                <h4 className="box-title">Tamizajes por Edad</h4>
                <div className="row">
                    <div className="col-xs-12">
                        <Bar datasetIdKey="id" options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
