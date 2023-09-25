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
        types: ['number', 'date', 'text'],
        value: '>',
    },
    {
        id: '4',
        name: 'Es mayor o igual que',
        types: ['number', 'date','text'],
        value: '>=',
    },
    {
        id: '5',
        name: 'Es menor que',
        types: ['number', 'date','text'],
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
        value: 'contains',
    },
]

export const OPERANDS = [
    {
        value: '==',
        label: 'Igual a',
        form_type: [
            'text',
            'textarea',
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
            'textarea',
            'number',
            'date',
            'select',
            'select multiple',
            'checkbox',
            'radio',
        ],
    },
    { value: '>', label: 'Mayor a', form_type: ['number', 'date','text'] },
    {
        value: '>=',
        label: 'Mayor o igual a',
        form_type: ['number', 'date', 'text'],
    },
    { value: '<', label: 'Menor a', form_type: ['number', 'date','text'] },
    {
        value: '<=',
        label: 'Menor o igual a',
        form_type: ['number', 'date', 'text'],
    },
    {
        value: 'contains',
        label: 'Contiene',
        form_type: ['text','textarea', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'not contains',
        label: 'No contiene',
        form_type: ['text','textarea', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'starts with',
        label: 'Empieza con',
        form_type: ['text','textarea', 'select', 'select multiple', 'checkbox', 'radio'],
    },
    {
        value: 'ends with',
        label: 'Termina con',
        form_type: ['text','textarea', 'select', 'select multiple', 'checkbox', 'radio'],
    },
]

const create = () => {}
