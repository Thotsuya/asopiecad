export default function SelectField({ fields, onFieldChange }) {
    return (
        <select className="form-control" name="field" onChange={onFieldChange}>
            {fields.map((field, index) => (
                <option key={field.value} value={field.value}>
                    {field.name}
                </option>
            ))}
        </select>
    )
}
