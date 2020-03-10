class clsUser {
    constructor(pDocument, pParent) {
        this.parent = pParent;


        this.users = [
            {user:"admin", pass:"Hola!123"},
            {user:"John", pass:"Doe"}
        ];

        this.parent.GenerateConsoleMessage("clsUser creado");

    }
/////////////////////////////////////////////////////////////////////////////ç
    checkCredentials() {
        if (this.parent.win.location.href == "http://localhost:63342/examenAure/initialscreen.html"){
            var user = this.parent.Cookies.getCookie("user");
            var pass = this.parent.Cookies.getCookie("pass");

            this.parent.GenerateConsoleErr("user = " + user + "// pass = " + pass);
            if (this.checkUserPass(user, pass)){
                this.parent.GenerateConsoleMessage("credenciales correctos");
                return true
            }else {
                this.parent.GenerateConsoleMessage("credenciales incorrectos");
                this.parent.NavigateTo("login");
                return false
            }
        }
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {string} pUser
     * @param {string} pPass
     * @returns {boolean}
     */
    checkUserPass(pUser, pPass){
        for (var i = 0; i < this.users.length; i++){
            if (this.users[i].user == pUser){
                if (this.users[i].pass == pPass){
                    this.parent.GenerateConsoleErr("User y pass correcto");
                    this.parent.GenerateConsoleErr("Posicion del objeto: " + i);
                    return true;
                }
            }

        }
        return false;
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {string} pUser
     * @returns {boolean}
     */
    checkUser(pUser){
        for (var i = 0; i < this.users.length; i++){
            if (this.users[i].user == pUser){
                this.parent.GenerateConsoleErr("User correcto");
                this.parent.GenerateConsoleErr("Posicion del objeto: " + i);
                    return true;
                }
            }

        this.parent.GenerateConsoleErr("User incorrecto//" + pUser);
        return false;
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {string} pPass
     * @returns {boolean}
     */
    checkPass(pPass){
        for (var i = 0; i < this.users.length; i++){
            if (this.users[i].pass == pPass){
                this.parent.GenerateConsoleErr("Pass correcto");
                this.parent.GenerateConsoleErr("Posicion del objeto: " + i);
                return true;
            }
        }
        this.parent.GenerateConsoleErr("Pass incorrecto//" + pPass);
        return false;
    }
/////////////////////////////////////////////////////////////////////////////
///Basurero
/////////////////////////////////////////////////////////////////////////////
    __checkCredentials() {
        if (this.win.location.href != "http://localhost:63342/examenAure/user.html" || this.win.location.href != "http://localhost:63342/examenAure/pass.html") {
            var user = this.Cookies.getCookie("user");
            var pass = this.Cookies.getCookie("pass");
            if (this.debug) {
                this.GenerateConsoleErr("user = " + user + "// pass = " + pass);
            }
            if (user == 'admin' && pass == 'Hola!123') {
                if (this.debug) {
                    this.GenerateConsoleErr("checkCredentials() = true");
                }
                return true
            } else {
                if (this.debug) {
                    this.GenerateConsoleErr("checkCredentials() = fale");
                }
                this.NavigateTo("user")
                return false
            }
        }
    }
}