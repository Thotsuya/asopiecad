export default function useUsers() {
    const can = (permission, permissions) => {
        return permissions.includes(permission)
    }

    return {
        can,
    }
}
