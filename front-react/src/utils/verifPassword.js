const verifPassword = (
    passwordString,
    verifPasswordString,
    verifPasswordInputElementId
) => {
    if (verifPasswordInputElementId) {
        if (passwordString === verifPasswordString) {
            document.getElementById(
                verifPasswordInputElementId
            ).style.backgroundColor = "lightgreen";
        } else if (verifPasswordString === "") {
            document.getElementById(
                verifPasswordInputElementId
            ).style.backgroundColor = "transparent";
        } else {
            document.getElementById(
                verifPasswordInputElementId
            ).style.backgroundColor = "#ffab9b";
        }
    } else {
        if (passwordString === verifPasswordString) {
            return true;
        } else {
            return false;
        }
    }
};
export default verifPassword;
