export default function FormTabs({ form }) {
    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            {form.tabs
                .sort((a, b) => a.order - b.order)
                .map((tab, index) => (
                    <li
                        key={`${form.form_slug}-${tab.slug}`}
                        role="presentation"
                        className={index === 0 ? 'active' : ''}
                    >
                        <a
                            href={`#tab-${tab.slug}-${tab.id}-${form.form_slug}`}
                            id={`tab-${tab.slug}-tab-${tab.id}-${form.form_slug}`}
                            role="tab"
                            data-toggle="tab"
                            aria-controls={`tab-${tab.slug}-${tab.id}-${form.form_slug}`}
                            aria-expanded="true"
                        >
                            {tab.name}
                        </a>
                    </li>
                ))}
        </ul>
    )
}
