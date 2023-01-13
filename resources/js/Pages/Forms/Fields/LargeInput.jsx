export default function LargeInput({
    field,
    onClick = () => {},
    editable = true,
    onChange = () => {},
    value = '',
    error = '',
}) {
    return (
        <div
            className={`${field.size} margin-bottom-10 form-group ${
                error ? 'has-error' : ''
            }`}
        >
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
                {editable && <i className="fa fa-times" onClick={onClick} />}
            </label>
            <textarea
                className="form-control"
                id={`${field.slug}-${field.id}`}
                name={field.slug}
                rows="3"
                style={{ resize: 'none' }}
                value={value}
                onChange={onChange}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}
