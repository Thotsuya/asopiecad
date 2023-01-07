export default function SmallInput({ field, onClick }) {
    return (
        <div className={`${field.size} margin-bottom-10`}>
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
                <i className="fa fa-times" onClick={onClick} />
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
