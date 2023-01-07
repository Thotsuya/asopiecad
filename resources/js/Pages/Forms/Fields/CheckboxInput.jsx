export default function CheckboxInput({ field }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <div className="checkbox primary">
                <input type="checkbox" id={field.slug} name={field.slug} />
                <label htmlFor={field.slug}>
                    {field.name}
                    {field.required && <span className="text-danger">*</span>}
                </label>
            </div>
        </div>
    );
}
