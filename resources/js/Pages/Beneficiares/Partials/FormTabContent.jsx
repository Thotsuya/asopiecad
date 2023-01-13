export default function FormTabContent({ form, tab, index, children }) {
    return (
        <>
            <div
                role="tabpanel"
                className={`tab-pane fade ${index === 0 ? 'active in' : ''}
                                            `}
                id={`tab-${tab.slug}-${tab.id}-${form.form_slug}`}
                aria-labelledby={`tab-${tab.slug}-tab`}
            >
                <div className="row">
                    <div className="col-xs-12">{children}</div>
                </div>
            </div>
        </>
    )
}
