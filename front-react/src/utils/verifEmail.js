const verifEmail = (emailString, emailInputElementId, setEmailOk) => {
    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    if (emailInputElementId) {
        if (re.test(emailString) && emailString !== "") {
            document.getElementById(emailInputElementId).style.backgroundColor =
                "lightgreen";
        } else if (emailString === "") {
            document.getElementById(emailInputElementId).style.backgroundColor =
                "transparent";
        } else {
            document.getElementById(emailInputElementId).style.backgroundColor =
                "#ffab9b";
        }
    }

    setEmailOk && setEmailOk(re.test(emailString));
    return re.test(emailString);
};
export default verifEmail;
