import './bootstrap'

// Importing styles
import '../css/style.min.css'
import '../fonts/themify-icons/themify-icons.css'
import '../plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css'
import '../plugins/select2/css/select2.min.css'

// Importing scripts
import './Scripts/jquery.min'
import '../plugins/bootstrap/js/bootstrap.min'
import '../plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min'
import '../plugins/select2/js/select2.min'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(<App {...props} />)
    },
})

InertiaProgress.init({ color: '#4B5563' })
