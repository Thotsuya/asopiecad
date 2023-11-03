import Select from 'react-select'
import {Departamentos, Municipios} from '@/Constants/Departamentos'
import {find} from 'lodash'

export default function Registrant({auth, data, type, setData}) {
    const getMunicipalities = () => {
        return Municipios[
            Departamentos.findIndex(
                (option) => option.value === data.department
            )
            ]
    }

    const institutions = [
        {
            label: 'ASOPIECAD',
            value: 'ASOPIECAD'
        },
        {
            label: 'MINSA',
            value: 'MINSA'
        }
    ];

    const months =
        [
            {label: 'Enero', value: 'enero'},
            {label: 'Febrero', value: 'febrero'},
            {label: 'Marzo', value: 'marzo'},
            {label: 'Abril', value: 'abril'},
            {label: 'Mayo', value: 'mayo'},
            {label: 'Junio', value: 'junio'},
            {label: 'Julio', value: 'julio'},
            {label: 'Agosto', value: 'agosto'},
            {label: 'Septiembre', value: 'septiembre'},
            {label: 'Octubre', value: 'octubre'},
            {label: 'Noviembre', value: 'noviembre'},
            {label: 'Diciembre', value: 'diciembre'}
        ]

    const getSelectedMunicipality = () => {
    }

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">
                        <i className="fa fa-user"/> {type === 'P-4353' ? 'Datos del registrante': 'Datos de quien lo aplica'}
                    </h4>

                    <div className="row">
                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {type === 'P-4353'? ' Nombre de quien lo registra' : 'Nombre de quien lo aplica'}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nombre"
                                    value={data.registrant_name}
                                    onChange={(e) =>
                                        setData(
                                            'registrant_name',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="Departamento">
                                    Departamento
                                </label>
                                <Select
                                    id="Departamento"
                                    options={Departamentos}
                                    value={Departamentos.find(
                                        (option) =>
                                            option.value === data.department
                                    )}
                                    defaultValue={Departamentos.find(
                                        (option) =>
                                            option.value === data.department
                                    )}
                                    onChange={(option) => {
                                        setData('department', option.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="Municipio">Municipio</label>
                                <Select
                                    id="Municipio"
                                    options={
                                        Municipios[
                                            Departamentos.findIndex(
                                                (option) =>
                                                    option.value ===
                                                    data.department
                                            )
                                            ]
                                    }
                                    defaultValue={Municipios[
                                        Departamentos.findIndex(
                                            (option) =>
                                                option.value ===
                                                data.department
                                        )
                                        ].find((option) => {
                                        return (
                                            option.value ===
                                            data.municipality
                                        )
                                    })}
                                    onChange={(option) => {
                                        setData('municipality', option.value)
                                    }}


                                />
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="date">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    placeholder="Fecha"
                                    value={data.date_of_screening}
                                    onChange={(e) => {
                                        setData(
                                            'date_of_screening',
                                            e.target.value
                                        )
                                    }}
                                />
                            </div>
                        </div>

                        {type === 'P-4353' && (
                            <>
                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="date">Institución u organización</label>
                                        <Select
                                            id="Institución"
                                            options={institutions}
                                            defaultValue={institutions.find(
                                                (option) =>
                                                    option.value === data.institution
                                            )}
                                            onChange={(option) => {
                                                setData('institution', option.value)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="date">Mes de Aplicación</label>
                                        <Select
                                            id="Mes"
                                            options={months}
                                            defaultValue={months.find(
                                                (option) =>
                                                    option.value === data.application_month
                                            )}
                                            onChange={(option) => {
                                                setData('application_month', option.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
