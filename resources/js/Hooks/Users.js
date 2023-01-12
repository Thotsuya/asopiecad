export default function useUsers() {
    const can = (permissionsToValidate, permissionsArray) => {
        // If it is an array
        if (Array.isArray(permissionsToValidate)) {
            let hasPermission = false
            permissionsToValidate.forEach((permission) => {
                if (permissionsArray.includes(permission)) {
                    hasPermission = true
                }
            })
            return hasPermission
        }

        // If it is a string
        return permissionsArray.includes(permissionsToValidate)
    }

    return {
        can,
    }
}
