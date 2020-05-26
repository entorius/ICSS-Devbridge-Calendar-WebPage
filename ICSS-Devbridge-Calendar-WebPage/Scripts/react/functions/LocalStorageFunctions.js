export function checkIfDelete() {
    var now = new Date().getTime();
    var expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime != null) {
        if (now - expirationTime > 0) {
            localStorage.clear();
        }
    }
}

export function Delete() {
    console.log("clearing storage");
    localStorage.clear();
}