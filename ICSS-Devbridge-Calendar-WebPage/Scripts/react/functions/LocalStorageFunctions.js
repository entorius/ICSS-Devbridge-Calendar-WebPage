export function checkIfDelete() {
    var now = new Date().getTime();
    var expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime != null) {
        if (now - expirationTime > 0) {
            Delete();
        }
    }
}

export function checkIfRedirectToLoginPage(props){
    var isLoggedIn = localStorage.token !== undefined;
    isLoggedIn ? checkIfDelete() : null;
    isLoggedIn = localStorage.token !== undefined;
    isLoggedIn ? null : props.history.push('/');
}

export function Delete() {
    console.log("clearing storage");
    localStorage.clear();
}