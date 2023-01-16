import { useEffect } from 'react'
export default function useDropdown(dropdown, isMobile = false) {
    useEffect(() => {
        let dropdowns = document.querySelectorAll(dropdown)
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', function (e) {
                e.preventDefault()
                if (window.innerWidth < 1025 || isMobile === false) {
                    if (dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active')
                    } else {
                        dropdowns.forEach((dropdown) =>
                            dropdown.classList.remove('active')
                        )
                        dropdown.classList.add('active')
                    }
                }
            })
        })

        document.addEventListener('click', function (e) {
            let selector = e.target
            if (
                !(
                    selector.classList.contains(dropdown) ||
                    selector.closest(dropdown)
                )
            ) {
                dropdowns.forEach((dropdown) =>
                    dropdown.classList.remove('active')
                )
            }
        })
    }, [])

    return true
}
