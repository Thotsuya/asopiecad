export default function SelectInput({ field, onClick }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
                <i className="fa fa-times" onClick={onClick} />
            </label>
            <select
                className="form-control"
                id={`${field.slug}-${field.id}`}
                name={field.slug}
                multiple={field.type === "select multiple"}
            >
                {field.options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
