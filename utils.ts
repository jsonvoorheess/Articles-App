export const getTheme = () => {
    if (localStorage.getItem("theme") === "light") {
        return false
    } else if (localStorage.getItem("theme") === "dark") {
        return true
    } else if (!localStorage.getItem("theme")) {
        return false
    }

}