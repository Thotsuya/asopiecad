import { useState } from 'react'

export default function ProgressListItem({ progress }) {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <li
                id={`list-${progress.id}`}
                className={`list-group-item list-group-item-action ${
                    visible ? 'active' : ''
                }`}
                onClick={() => {
                    setVisible((visible) => !visible)
                }}
            >
                <span
                    className={`badge ${visible ? 'bg-default' : 'bg-primary'}`}
                >
                    {progress.progress}
                </span>
                <span>
                    <strong> {progress.user.name}</strong> el{' '}
                    {progress.created_at}
                </span>
            </li>
            {visible && (
                <div
                    id={`container-${progress.id}`}
                    className="list-group-item vvvvvvvvvvvvvvvvvvv"
                >
                    {progress.description}
                </div>
            )}
        </>
    )
}
