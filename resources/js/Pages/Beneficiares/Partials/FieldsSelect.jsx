export default function FieldsSelect({ fields, onFieldChange }) {
    return (
        <select className="form-control" name="field" onChange={onFieldChange}>
            {fields.map((field, index) => (
                <option key={index} value={JSON.stringify(field)}>
                    {field.name}
                </option>
            ))}
        </select>
    )
}
