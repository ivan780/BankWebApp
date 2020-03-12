class clsUser {
    /**
     * @param {clsStoreApp} pParent
     */
    constructor(pParent) {
        this.parent = pParent;


        this.users = [
            {user: "21232f297a57a5a743894a0e4a801fc3", pass: "a44f831311c46bfc9b8c0ecfbca499c8"},
            {user: "1", pass: "1"}
        ];

        this.parent.GenerateConsoleMessage("clsUser creado");

    }

/////////////////////////////////////////////////////////////////////////////
    /**
     * @return {boolean}
     */
    checkCredentials() {
        var user = this.parent.Cookies.getCookie("user");
        var pass = this.parent.Cookies.getCookie("pass");
        if (this.parent.win.location.pathname == "/examenAure/initialscreen.html") {
            this.parent.GenerateConsoleLog("user = " + user + "// pass = " + pass);
            if (this.checkUserPass(user, pass)) {
                this.parent.GenerateConsoleMessage("credenciales correctos");
                return true
            } else {
                this.parent.GenerateConsoleMessage("credenciales incorrectos");
                this.parent.NavigateTo("login");
                return false
            }
        } else if (this.parent.win.location.pathname == "/examenAure/index.html" || this.parent.win.location.pathname == "/examenAure/pass.html") {
            if (this.checkUserPass(user, pass)) {
                this.parent.GenerateConsoleMessage("credenciales correctos");
                this.parent.NavigateTo("initScreen");
                return true
            } else {
                this.parent.GenerateConsoleMessage("credenciales incorrectos");
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
    checkUserPass(pUser, pPass) {
        if (this.checkUser(pUser)){
            if (this.checkPass(pPass)){
                this.parent.GenerateConsoleLog("User y pass correcto");
                return true;
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
    checkUser(pUser) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].user == pUser) {
                this.parent.GenerateConsoleLog("User correcto");
                this.parent.GenerateConsoleLog("Posicion del objeto: " + i);
                return true;
            }
        }

        this.parent.GenerateConsoleLog("User incorrecto//" + pUser);
        return false;
    }

/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {string} pPass
     * @returns {boolean}
     */
    checkPass(pPass) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].pass == pPass) {
                this.parent.GenerateConsoleLog("Pass correcto");
                this.parent.GenerateConsoleLog("Posicion del objeto: " + i);
                return true;
            }
        }
        this.parent.GenerateConsoleLog("Pass incorrecto//" + pPass);
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