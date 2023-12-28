import Select from 'react-select'
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function ProgramBeneficiaryModa({ beneficiaries, program }) {
    const [options, setOptions] = useState([])
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)

    useEffect(() => {

        setOptions(
            beneficiaries.map((beneficiary) => ({
                value: beneficiary.id,
                label: beneficiary.name,
            }))
        )
    }, [beneficiaries])

    const handleSubmit = () => {
        Inertia.get(
            route('programs.forms.create', program.id),
            {
                beneficiary_id: selectedBeneficiary.value,
            },
            {
                onBefore: () => {
                    $('#modal-add-beneficiary').modal('hide')
                },
            }
        )
    }

    return (
        <div
            className="modal fade"
            id="modal-add-beneficiary"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-add-beneficiary-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-add-beneficiary-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-add-beneficiary-label"
                        >
                            Registrar Beneficiario
                        </h4>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="beneficiary">
                                        Seleccionar Beneficiario
                                    </label>
                                    <Select
                                        id="beneficiary"
                                        name="beneficiary"
                                        noOptionsMessage={() =>
                                            'No hay opciones'
                                        }
                                        placeholder="Selecciona un Beneficiario"
                                        options={options}
                                        onChange={(option) => {
                                            setSelectedBeneficiary(option)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={handleSubmit}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
