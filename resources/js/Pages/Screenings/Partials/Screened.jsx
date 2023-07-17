

export default function Screened({
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}) {

    const genderOptions = [
        {
            label: 'Masculino',
            value: 'masculino',
        },
        {
            label: 'Femenino',
            value: 'femenino',
        },
    ]

    return (
        <>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            <i className="fa fa-user" /> Datos del Tamizaje
                        </h4>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Nombre y Apellido
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Nombre y Apellido"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData('name', e.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="age">Edad</label>
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

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="gender">Sexo</label>
                                    {console.log(data.gender)}
                                    <Select
                                        options={genderOptions}
                                        value={genderOptions.find(
                                            (option) =>
                                                option.value === data.gender
                                        )}
                                        defaultValue={genderOptions.find(
                                            (option) =>
                                                option.value === data.gender
                                        )   }
                                        placeholder="Sexo"
                                        onChange={(option) => {
                                            setData('gender', option.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <div className="row margin-top-10">
                            <div className="col-xs-12">
                                <h4 className="box-title">
                                    <i className="fa fa-comments" />{' '}
                                    Comunicación{' '}
                                    <strong>
                                        {[...Array(6)].reduce((acc, _, i) => {
                                            return (
                                                acc +
                                                parseInt(
                                                    data[
                                                        `communication_level_${
                                                            i + 1
                                                        }`
                                                    ]
                                                )
                                            )
                                        }, 0)}
                                    </strong>
                                </h4>
                            </div>
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index + new Date().getTime()}
                                    className="col-md-2"
                                >
                                    <div className="form-group">
                                        <label htmlFor="communication_1">
                                            Comunicación {index + 1} :{' '}
                                            <strong>
                                                {
                                                    data[
                                                        `communication_level_${
                                                            index + 1
                                                        }`
                                                    ]
                                                }
                                            </strong>
                                        </label>
                                        <input
                                            type="range"
                                            className="primary"
                                            id="communication_1"
                                            min="0"
                                            max="10"
                                            defaultValue={
                                                data[
                                                    'communication_level_' +
                                                        (index + 1)
                                                ]
                                            }
                                            onMouseUp={(e) => {
                                                setData(
                                                    'communication_level_' +
                                                        (index + 1),
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            <i className="fa fa-arrows-alt" /> Movimiento Amplio{' '}
                            <strong>
                                {[...Array(6)].reduce((acc, _, i) => {
                                    return (
                                        acc +
                                        parseInt(
                                            data[
                                                `wide_movements_level_${i + 1}`
                                            ]
                                        )
                                    )
                                }, 0)}
                            </strong>
                        </h4>
                        <div className="row margin-top-10">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index + new Date().getTime()}
                                    className="col-md-2"
                                >
                                    <div className="form-group">
                                        <label htmlFor="wide_movment">
                                            Movimiento Amplio {index + 1}{' '}
                                            {' : '}
                                            <strong>
                                                {
                                                    data[
                                                        `wide_movements_level_${
                                                            index + 1
                                                        }`
                                                    ]
                                                }
                                            </strong>
                                        </label>
                                        <input
                                            type="range"
                                            className="primary"
                                            id={`wide_movment_${index + 1}`}
                                            min="0"
                                            max="10"
                                            defaultValue={
                                                data[
                                                    'wide_movements_level_' +
                                                        (index + 1)
                                                ]
                                            }
                                            onMouseUp={(e) => {
                                                setData(
                                                    'wide_movements_level_' +
                                                        (index + 1),
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            <i className="fa fa-arrows" /> Movimientos Finos{' '}
                            <strong>
                                {[...Array(6)].reduce((acc, _, i) => {
                                    return (
                                        acc +
                                        parseInt(
                                            data[
                                                `fine_movements_level_${i + 1}`
                                            ]
                                        )
                                    )
                                }, 0)}
                            </strong>
                        </h4>
                        <div className="row margin-top-10">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index + new Date().getTime()}
                                    className="col-md-2"
                                >
                                    <div className="form-group">
                                        <label htmlFor="fine_movment">
                                            Movimientos Finos {index + 1}{' '}
                                            {' : '}
                                            <strong>
                                                {
                                                    data[
                                                        `fine_movements_level_${
                                                            index + 1
                                                        }`
                                                    ]
                                                }
                                            </strong>
                                        </label>
                                        <input
                                            type="range"
                                            className="primary"
                                            id={`fine_movements_${index + 1}`}
                                            min="0"
                                            max="10"
                                            defaultValue={
                                                data[
                                                    'fine_movements_level_' +
                                                        (index + 1)
                                                ]
                                            }
                                            onMouseUp={(e) => {
                                                setData(
                                                    'fine_movements_level_' +
                                                        (index + 1),
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            <i className="fa fa-question-circle" /> Resolución
                            de Problemas{' '}
                            <strong>
                                {[...Array(6)].reduce((acc, _, i) => {
                                    return (
                                        acc +
                                        parseInt(
                                            data[
                                                `problem_solving_level_${i + 1}`
                                            ]
                                        )
                                    )
                                }, 0)}
                            </strong>
                        </h4>
                        <div className="row margin-top-10">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index + new Date().getTime()}
                                    className="col-md-2"
                                >
                                    <div className="form-group">
                                        <label htmlFor="prolem_solving">
                                            Resolución de Problemas {index + 1}{' '}
                                            {' : '}
                                            <strong>
                                                {
                                                    data[
                                                        `problem_solving_level_${
                                                            index + 1
                                                        }`
                                                    ]
                                                }
                                            </strong>
                                        </label>
                                        <input
                                            type="range"
                                            className="primary"
                                            id={`problem_solving_level_${
                                                index + 1
                                            }`}
                                            min="0"
                                            max="10"
                                            defaultValue={
                                                data[
                                                    'problem_solving_level_' +
                                                        (index + 1)
                                                ]
                                            }
                                            onMouseUp={(e) => {
                                                setData(
                                                    'problem_solving_level_' +
                                                        (index + 1),
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">
                            <i className="fa fa-user" /> Socio Individual{' '}
                            <strong>
                                {[...Array(6)].reduce((acc, _, i) => {
                                    return (
                                        acc +
                                        parseInt(
                                            data[
                                                `social_individual_level_${
                                                    i + 1
                                                }`
                                            ]
                                        )
                                    )
                                }, 0)}
                            </strong>
                        </h4>
                        <div className="row margin-top-10">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index + new Date().getTime()}
                                    className="col-md-2"
                                >
                                    <div className="form-group">
                                        <label htmlFor="social_individual">
                                            Socio Individual {index + 1} {' : '}
                                            <strong>
                                                {
                                                    data[
                                                        `social_individual_level_${
                                                            index + 1
                                                        }`
                                                    ]
                                                }
                                            </strong>
                                        </label>
                                        <input
                                            type="range"
                                            className="primary"
                                            id={`social_individual_level_${
                                                index + 1
                                            }`}
                                            min="0"
                                            max="10"
                                            defaultValue={
                                                data[
                                                    'social_individual_level_' +
                                                        (index + 1)
                                                ]
                                            }
                                            onMouseUp={(e) => {
                                                setData(
                                                    'social_individual_level_' +
                                                        (index + 1),
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <i className="fa fa-spinner fa-spin" />{' '}
                                Guardando...
                            </>
                        ) : (
                            'Guardar'
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

import Select from 'react-select'
