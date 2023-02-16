export const OPERATORS = [
    {
        id: '1',
        name: 'Es igual a',
        types: ['text', 'number', 'date', 'select'],
        value: '==',
    },
    {
        id: '2',
        name: 'No es igual a',
        types: ['text', 'number', 'date', 'select'],
        value: '!=',
    },
    {
        id: '3',
        name: 'Es mayor que',
        types: ['number', 'date'],
        value: '>',
    },
    {
        id: '4',
        name: 'Es mayor o igual que',
        types: ['number', 'date'],
        value: '>=',
    },
    {
        id: '5',
        name: 'Es menor que',
        types: ['number', 'date'],
        value: '<',
    },
    {
        id: '6',
        name: 'Es menor o igual que',
        types: ['number', 'date'],
        value: '<=',
    },
    {
        id: '7',
        name: 'Contiene',
        types: ['text', 'select'],
    },
]

export const OPERANDS = [
    {
        value: '==',
        label: 'Igual a',
        form_type: [
            'text',
            'number',
            'date',
            'select',
            'select multiple',
            'checkbox',
            'radio',
        ],
    },
    {
        value: '!=',
        label: 'Diferente a',
        form_type: [
            'text',
            'number',
            'date',
            'select',
            'select multiple',
            'checkbox',
            'radio',
        ],
    },
    { value: '>', label: 'Mayor a', form_type: ['number', 'date'] },
    {
        value: '>=',
        label: 'Mayor o igual a',
        form_type: ['number', 'date'],
    },
    { value: '<', label: 'Menor a', form_type: ['number', 'date'] },
    {
        value: '<=',
        label: 'Menor o igual a',
        form_type: ['number', 'date'],
    },
    {
        value: 'contains',
        label: 'Contiene',
        form_type: ['text', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'not contains',
        label: 'No contiene',
        form_type: ['text', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'starts with',
        label: 'Empieza con',
        form_type: ['text', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'ends with',
        label: 'Termina con',
        form_type: ['text', 'select', 'select multiple', 'checkbox', 'radio'],
    },
]
