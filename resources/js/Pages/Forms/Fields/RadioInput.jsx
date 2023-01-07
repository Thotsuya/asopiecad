export default function RadioInput({ field }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <div className="radio primary">
                <input
                    type="radio"
                    id={field.slug}
                    name={field.slug}
                    value={field.slug}
                />
                <label htmlFor={field.slug}>
                    {field.name}
                    {field.required && <span className="text-danger">*</span>}
                </label>
            </div>
        </div>
    );
}
