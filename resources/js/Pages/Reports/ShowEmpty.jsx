import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/inertia-react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {Inertia} from '@inertiajs/inertia'
import {useRef, useState} from 'react'
import ScreeningsRow from "@/Components/Screenings/ScreeningsIndicator";
import ResultRow from "@/Pages/Reports/ResultRow";

export default function ShowEmpty({
                                 auth,
                                 project,
                                 results,
                                 headers,
                                 labels,
                                 global,
                                 datasets,
                                 start_date = null,
                                 end_date = null,
                                 screenings = [],
                                 consultations_count,
                                 meeting_goals = [],
                             }) {


    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes"/>

        </AuthenticatedLayout>
    )
}
