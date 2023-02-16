import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState, useEffect, useRef } from 'react'
import { Inertia } from '@inertiajs/inertia'
import useToasts from '@/Hooks/Toasts'

export default function Tabs({ data }) {
    const [tab, setTab] = useState('')
    const { success, error, prompt } = useToasts()
    const [tabs, setTabs] = useState(data.tabs)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTabs(data.tabs)
    }, [data])

    const handleTabChange = (e) => {
        setTab(e.target.value)
    }

    const addTabToForm = () => {
        Inertia.post(
            route('forms.tabs.store', data.id),
            {
                tab_name: tab,
            },
            {
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: () => {
                    success('Pestaña agregada correctamente')
                },
                onFinish: () => setLoading(false),
            }
        )
    }

    const tabInputRef = useRef()

    const toggleTabEditMode = (tab_id) => {
        setTabs((tabs) => {
            return tabs.map((tab) => {
                if (tab.id === tab_id) {
                    return {
                        ...tab,
                        editMode: !tab.editMode,
                    }
                }
                return tab
            })
        })
    }

    const handleTabEdit = (tab_id, tab_name) => {
        setTabs((tabs) => {
            return tabs.map((tab) => {
                if (tab.id === tab_id) {
                    return {
                        ...tab,
                        name: tab_name,
                    }
                }
                return tab
            })
        })
    }

    const handleTabDrop = (droppedItem) => {
        if (!droppedItem.destination) return
        const newTabs = [...tabs]

        const [droppedTab] = newTabs.splice(droppedItem.source.index, 1)

        newTabs.splice(droppedItem.destination.index, 0, droppedTab)

        setTabs(newTabs)

        Inertia.patch(
            route('forms.tabs.order', data.id),
            {
                tabs: newTabs.map((tab) => tab.id),
            },
            {
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: () => {
                    success('Orden actualizado correctamente')
                },
                onFinish: () => setLoading(false),
            }
        )
    }

    const updateTab = (tab) => {
        Inertia.put(
            route('forms.tabs.update', tab.id),
            {
                tab_name: tab.name,
            },
            {
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: () => {
                    success('Pestaña actualizada correctamente')
                    setTabs((tabs) => {
                        return tabs.map((tab) => {
                            return {
                                ...tab,
                                editMode: false,
                            }
                        })
                    })
                },
                onFinish: () => setLoading(false),
            }
        )
    }

    const deleteTab = (tab_id) => {
        prompt(
            '¿Estás seguro de eliminar esta pestaña?',
            'Esta acción no se puede deshacer'
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('forms.tabs.destroy', tab_id), {
                    preserveScroll: true,
                    onBefore: () => setLoading(true),
                    onSuccess: () => {
                        success('Pestaña eliminada correctamente')
                    },
                    onFinish: () => setLoading(false),
                })
            }
        })
    }

    return (
        <div className="box-content">
            <h4 className="box-title">Pestañas del formulario</h4>
            <div className="row">
                <div className="col-lg-12 margin-bottom-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la pestaña"
                        id="tab"
                        name="tab"
                        ref={tabInputRef}
                        onChange={handleTabChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTabToForm()
                            }
                        }}
                        value={tab}
                    />
                </div>
                <div className="col-lg-12 margin-bottom-10">
                    <button
                        className="btn btn-primary btn-block"
                        type="button"
                        onClick={addTabToForm}
                        disabled={tab === '' || loading}
                    >
                        <i className="fa fa-plus w-full" />
                    </button>
                </div>
                <div className="col-lg-12 margin-bottom-10">
                    {tabs.length > 0 && (
                        <DragDropContext onDragEnd={handleTabDrop}>
                            <Droppable droppableId="list-tab-group">
                                {(provided) => (
                                    <div
                                        className="list-group"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {tabs.map((tab, index) => (
                                            <Draggable
                                                key={tab.id}
                                                draggableId={tab.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        className="list-group-item"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="row">
                                                            <div className="col-lg-9">
                                                                {tab.editMode ? (
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Nombre de la pestaña"
                                                                        id="tab_name"
                                                                        name="tab_name"
                                                                        value={
                                                                            tab.name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleTabEdit(
                                                                                tab.id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    tab.name
                                                                )}
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <button
                                                                    className="btn btn-danger btn-xs pull-right"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        deleteTab(
                                                                            tab.id
                                                                        )
                                                                    }}
                                                                >
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                                <button
                                                                    className={`btn btn-xs pull-right ${
                                                                        tab.editMode
                                                                            ? 'btn-success'
                                                                            : 'btn-info'
                                                                    }`}
                                                                    type="button"
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            tab.editMode
                                                                        ) {
                                                                            updateTab(
                                                                                tab
                                                                            )
                                                                        } else {
                                                                            toggleTabEditMode(
                                                                                tab.id
                                                                            )
                                                                        }
                                                                    }}
                                                                >
                                                                    {tab.editMode ? (
                                                                        <i className="fa fa-check" />
                                                                    ) : (
                                                                        <i className="fa fa-pencil" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
        </div>
    )
}
