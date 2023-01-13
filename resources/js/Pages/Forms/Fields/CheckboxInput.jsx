export default function CheckboxInput({
    field,
    onClick = () => {},
    editable = true,
    onChange = () => {},
    checked = false,
    error = '',
}) {
    return (
        <div
            className={`${field.size} margin-bottom-10 form-group ${
                error ? 'has-error' : ''
            }`}
        >
            <div className="checkbox primary">
                <input
                    type="checkbox"
                    id={`${field.slug}-${field.id}`}
                    name={field.slug}
                    checked={checked}
                    onChange={onChange}
                />
                <label htmlFor={`${field.slug}-${field.id}`}>
                    {field.name}
                    {editable && field.required && (
                        <>
                            <span className="text-danger">*</span>
                            <i className="fa fa-times" onClick={onClick} />
                        </>
                    )}
                </label>
            </div>
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}
