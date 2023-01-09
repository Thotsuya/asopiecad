export default function CheckboxInput({ field, onClick }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <div className="checkbox primary">
                <input
                    type="checkbox"
                    id={`${field.slug}-${field.id}`}
                    name={field.slug}
                />
                <label htmlFor={field.slug}>
                    {field.name}
                    {field.required && <span className="text-danger">*</span>}
                    <i className="fa fa-times" onClick={onClick} />
                </label>
            </div>
        </div>
    );
}
