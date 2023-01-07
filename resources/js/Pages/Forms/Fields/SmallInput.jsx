export default function SmallInput({ field }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
            </label>
            <input
                type={field.type}
                className="form-control"
                id={field.slug}
                name={field.slug}
            />
        </div>
    );
}
