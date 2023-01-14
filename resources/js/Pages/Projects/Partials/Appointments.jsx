import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

export default function Appointments({ appointments = [] }) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1500)
    }, [])

    return (
        <div className="col-xs-12">
            <div className="box-content">
                <h4 className="box-title">
                    Visitas <i className="fa fa-calendar" />
                </h4>

                <div className="row">
                    <div className="col-xs-12">
                        {loaded ? (
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                locale={'es'}
                                events={appointments}
                                eventClick={(info) => {
                                    console.log(info)
                                }}
                            />
                        ) : (
                            <div className="text-center">
                                <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
