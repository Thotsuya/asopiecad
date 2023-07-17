import Select from "react-select";
import { Departamentos, Municipios } from '@/Constants/Departamentos'
import { find } from 'lodash'


export default function ScreenedP4353({
                                          data,
                                          setData,
                                          handleSubmit,
                                          processing,
                                          errors,
                                      }) {


    let disabilities = [
        {
            "id": 1,
            "label": "Sin Discapacidad",
            "value": "sin-discapacidad-1"
        },
        {
            "id": 2,
            "label": "Sindrome Kabiki",
            "value": "sindrome-kabiki-2"
        },
        {
            "id": 3,
            "label": "Intelectual",
            "value": "intelectual-3"
        },
        {
            "id": 4,
            "label": "Visual",
            "value": "visual-4"
        },
        {
            "id": 5,
            "label": "Parálisis Cerebral",
            "value": "paralisis-cerebral-5"
        },
        {
            "id": 6,
            "label": "Auditiva",
            "value": "auditiva-6"
        },
        {
            "id": 7,
            "label": "Motora",
            "value": "motora-7"
        },
        {
            "id": 8,
            "label": "Psicosocial",
            "value": "psicosocial-8"
        },
        {
            "id": 9,
            "label": "Fisico motora",
            "value": "fisico-motora-9"
        },
        {
            "id": 10,
            "label": "Déficit de atención",
            "value": "deficit-de-atencion--10"
        },
        {
            "id": 11,
            "label": "Parálisis Cerebral Infantil",
            "value": "paralisis-cerebral-infantil-11"
        },
        {
            "id": 12,
            "label": "Alteración En el desarrollo",
            "value": "alteracion-en-el-desarrollo-12"
        },
        {
            "id": 13,
            "label": "Retardo en el Desarrollo Sicomotor",
            "value": "retardo-en-el-desarrollo-sicomotor-13"
        },
        {
            "id": 14,
            "label": "Paladar Hendido",
            "value": "paladar-hendido-14"
        },
        {
            "id": 15,
            "label": "Pie equinovaro",
            "value": "pie-equinovaro-15"
        },
        {
            "id": 16,
            "label": "Microcefalia Severa",
            "value": "microcefalia-severa-16"
        },
        {
            "id": 17,
            "label": "Trastorno en el Lenguaje",
            "value": "trastorno-en-el-lenguaje-17"
        },
        {
            "id": 18,
            "label": "Intelectual Leve",
            "value": "intelectual-leve-18"
        },
        {
            "id": 19,
            "label": "Microcefalia",
            "value": "microcefalia-19"
        },
        {
            "id": 20,
            "label": "Sindrome de Down",
            "value": "sindrome-de-down-20"
        },
        {
            "id": 21,
            "label": "Autismo",
            "value": "autismo-21"
        },
        {
            "id": 22,
            "label": "Hipotoridome congénito",
            "value": "hipotoridome-congenito-22"
        },
        {
            "id": 23,
            "label": "Trastorno por déficit de atención e hiperactividad (TDAH)",
            "value": "trastorno-por-deficit-de-atencion-e-hiperactividad-tdah-23"
        },
        {
            "id": 24,
            "label": "Esclerosis múltiple",
            "value": "esclerosis-multiple-24"
        },
        {
            "id": 25,
            "label": "Fibrosis quística",
            "value": "fibrosis-quistica-25"
        },
        {
            "id": 26,
            "label": "Enfermedad de Huntington",
            "value": "enfermedad-de-huntington-26"
        },
        {
            "id": 27,
            "label": "Síndrome de Asperger",
            "value": "sindrome-de-asperger-27"
        },
        {
            "id": 28,
            "label": "Síndrome de Rett",
            "value": "sindrome-de-rett-28"
        },
        {
            "id": 29,
            "label": "Síndrome de Prader-Willi",
            "value": "sindrome-de-prader-willi-29"
        },
        {
            "id": 30,
            "label": "Síndrome de Angelman",
            "value": "sindrome-de-angelman-30"
        },
        {
            "id": 31,
            "label": "Vulnerable",
            "value": "vulnerable-31"
        },
        {
            "id": 32,
            "label": "Paralisis Cerebral Infantil",
            "value": "paralisis-cerebral-infantil-32"
        },
        {
            "id": 33,
            "label": "Paralisis Cerebral",
            "value": "paralisis-cerebral-33"
        }
    ]
    let genderOptions = [
        {
            label: 'Masculino',
            value: 'm-1',
        },
        {
            label: 'Femenino',
            value: 'f-2',
        },
    ]
    let disabilityOptions = [
        {
            label: 'Si',
            value: 'si-1',
        },
        {
            label: 'No',
            value: 'no-2',
        }
    ]
    let visualAcuity = [
        {
            label: 'OD',
            value: 'OD-1',
        },
        {
            label: 'OI',
            value: '0I-2',
        }
    ]


    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">
                        <i className="fa fa-user"/> Datos del Tamizaje
                    </h4>

                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="first_name">
                                    1er Nombre
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="form-control"
                                    placeholder="1er Nombre"
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="first_name">
                                    2do Nombre
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="form-control"
                                    placeholder="1er Nombre"
                                    value={data.second_name}
                                    onChange={e => setData('second_name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="first_surname">
                                    1er Apellido
                                </label>
                                <input
                                    type="text"
                                    name="first_surname"
                                    id="first_surname"
                                    className="form-control"
                                    placeholder="1er Apellido"
                                    value={data.first_surname}
                                    onChange={e => setData('first_surname', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="second_surname">
                                    2do Apellido
                                </label>

                                <input
                                    type="text"
                                    name="second_surname"
                                    id="second_surname"
                                    className="form-control"
                                    placeholder="2do Apellido"
                                    value={data.second_surname}
                                    onChange={e => setData('second_surname', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="gender">
                                    Sexo
                                </label>

                                <Select
                                    options={genderOptions}
                                    placeholder="Sexo"
                                    onChange={(option) => {
                                        setData('gender', option.value)
                                    }}
                                    defaultValue={genderOptions.find((option) =>
                                        option.value  === data.gender
                                    )}
                                    value={genderOptions.find((option) =>
                                        option.value === data.gender
                                    )}
                                />

                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                {/*    Edad*/}
                                <label htmlFor="age">
                                    Edad
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="age"
                                    placeholder="Edad"
                                    value={data.age}
                                    onChange={(e) => {
                                        setData('age', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="disability_yes_no">
                                    Discapacidad ( Si / No )
                                </label>
                                <Select
                                    options={disabilityOptions}
                                    placeholder="Discapacidad"
                                    defaultValue={disabilityOptions.find((option) => option.value === data.disability_yes_no)}
                                    onChange={(option) => {
                                        setData('disability_yes_no', option.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="disability">
                                    Tipo de Discapacidad o alteración en el desarrollo
                                </label>
                                <Select
                                    options={disabilities}
                                    defaultValue={disabilities.filter((option) => data.disability_type.includes(option.value))}
                                    placeholder="Discapacidad"
                                    isMulti={true}
                                    onChange={(option) => {
                                        setData('disability_type', option.map(o => o.value))
                                    }}
                                />


                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="date_of_birth">
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date_of_birth"
                                    placeholder="Fecha de Nacimiento"
                                    value={data.date_of_birth}
                                    onChange={(e) => {
                                        setData('date_of_birth', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="document">
                                    Cédula de Identidad
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="document"
                                    placeholder="Cédula de Identidad"
                                    value={data.document}
                                    onChange={(e) => {
                                        setData('document', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="address">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="Dirección"
                                    value={data.address}
                                    onChange={(e) => {
                                        setData('address', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="Departamento">
                                    Departamento
                                </label>
                                <Select
                                    id="Departamento"
                                    options={Departamentos}
                                    value={Departamentos.find(
                                        (option) =>
                                            option.value === data.screened_deparment
                                    )}
                                    defaultValue={Departamentos.find(
                                        (option) =>
                                            option.value === data.screened_deparment
                                    )}
                                    onChange={(option) => {
                                        setData('screened_deparment', option.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="Municipio">Municipio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Municipio"
                                    placeholder="Municipio"
                                    value={data.screened_municipality}
                                    onChange={(e) => {
                                        setData('screened_municipality', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label htmlFor="phone">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Teléfono"
                                    value={data.screened_phone_number}
                                    onChange={(e) => {
                                        setData('screened_phone_number', e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="form-group">
                                <label htmlFor="screened_visual_acuity">
                                    Agudeza Visual
                                </label>
                                {/*[{"id":1,"name":"OD","value":"OD-1","order":1,"editMode":false},{"id":2,"name":"OI","value":"0I-2","order":2,"editMode":false}]*/}
                                <Select
                                    options={visualAcuity}
                                    placeholder="Agudeza Visual"
                                    defaultValue={visualAcuity.find((option) => option.value === data.screened_visual_acuity)}
                                    onChange={(option) => {
                                        setData('screened_visual_acuity', option.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="form-group">
                                <label htmlFor="screened_refered">
                                    Referidos
                                </label>
                                <Select
                                    options={disabilityOptions}
                                    defaultValue={disabilityOptions.find((option) => option.value === data.screened_refered)}
                                    placeholder="Referidos"
                                    onChange={(option) => {
                                        setData('screened_refered', option.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="screened_observations">
                                    Observaciones
                                </label>
                                <textarea
                                    className="form-control"
                                    id="screened_observations"
                                    rows="3"
                                    value={data.screened_observations}
                                    onChange={(e) => {
                                        setData('screened_observations', e.target.value)
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="screened_visual_acuity_right_eye">
                                    Agudeza Visual Ojo Derecho
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screened_visual_acuity_right_eye"
                                    placeholder="Agudeza Visual Ojo Derecho"
                                    value={data.screened_visual_acuity_right}
                                    onChange={(e) => {
                                        setData('screened_visual_acuity_right', e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="form-group">
                                <label htmlFor="screened_visual_acuity_left_eye">
                                    Agudeza Visual Ojo Izquierdo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="screened_visual_acuity_left_eye"
                                    placeholder="Agudeza Visual Ojo Izquierdo"
                                    value={data.screened_visual_acuity_left}
                                    onChange={(e) => {
                                        setData('screened_visual_acuity_left', e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={() => handleSubmit()}
                                disabled={processing}
                            >
                                {processing ? 'Guardando...' : 'Guardar'}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
