export default function LargeInput({ field, onClick }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
                <i className="fa fa-times" onClick={onClick} />
            </label>
            <textarea
                className="form-control"
                id={`${field.slug}-${field.id}`}
                name={field.slug}
                rows="3"
                style={{ resize: "none" }}
            />
        </div>
    );
}
