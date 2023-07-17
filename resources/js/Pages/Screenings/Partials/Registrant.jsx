import Select from 'react-select'
import { Departamentos, Municipios } from '@/Constants/Departamentos'
import { find } from 'lodash'

export default function Registrant({ auth, data, setData }) {
    const getMunicipalities = () => {
        return Municipios[
            Departamentos.findIndex(
                (option) => option.value === data.department
            )
        ]
    }

    const getSelectedMunicipality = () => {}

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">
                        <i className="fa fa-user" /> Datos del registrante
                    </h4>

                    <div className="row">
                        <div className="col-xs-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Nombre de quien lo aplica
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
                                {console.log(data.municipality)}
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
                                    defaultValue={find(
                                        Municipios[
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
                                        })
                                    )}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
