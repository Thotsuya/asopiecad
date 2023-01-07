export default function LargeInput({ field }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
            </label>
            <textarea
                className="form-control"
                id={field.slug}
                name={field.slug}
                rows="3"
                style={{ resize: "none" }}
            />
        </div>
    );
}
