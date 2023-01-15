import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'

export default function Appointments({
    appointments = [],
    setSelectedAppointment,
}) {
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
                                    setSelectedAppointment({
                                        id: parseInt(info.event.id),
                                        title: info.event.title,
                                        date: new Date(
                                            info.event.start
                                        ).toLocaleString(),
                                        beneficiary:
                                            info.event.extendedProps
                                                .beneficiary,
                                        project_id: parseInt(
                                            info.event.extendedProps.project_id
                                        ),
                                        comments:
                                            info.event.extendedProps.comments,
                                        user: info.event.extendedProps.user,
                                    })

                                    $('#modal-show-visit').modal('show')
                                }}
                                eventTimeFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }}
                            />
                        ) : (
                            <div className="text-center">
                                <i className="fa fa-spinner fa-spin fa-4x fa-fw" />{' '}
                                <br />
                                Cargando...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
