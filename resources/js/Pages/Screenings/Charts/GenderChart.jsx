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
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

export default function GenderChart({ screenings_per_gender }) {
    ChartJS.register(
        ArcElement,
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
                text: 'Tamizajes por género',
            },
        },
    }

    const data = {
        // Capitalize first letter
        labels: screenings_per_gender.map(
            (screening) =>
                screening.label.charAt(0).toUpperCase() +
                screening.label.slice(1)
        ),
        datasets: [
            {
                label: 'Total',
                data: screenings_per_gender.map((screening) => screening.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
            },
        ],
    }

    return (
        <div className="col-md-4">
            <div className="box-content">
                <h4 className="box-title">Tamizajes por género</h4>
                <div className="row">
                    <div className="col-xs-12">
                        <Pie datasetIdKey="id" options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
