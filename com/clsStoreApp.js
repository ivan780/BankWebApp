class clsStoreApp {
    constructor(pWin, pDoc, Cookie, pDebug) {
        this.doc = pDoc;
        this.win = pWin;
        this.cookies = Cookie
        this.debug = pDebug
        this.patronPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")

        this.checkCredentials()
    }

/////////////////////////////////////////////////////////////////////////////
    Login() {
        if (this.ValidateFields() == true) {
            console.log('Datos todo correcto ' + this.GetScreenValue('username'));
            var tUN = this.GetScreenValue('username');
            var tPW = this.GetScreenValue('password');

            if (!!this.validatePass(tPW)) {
                return false;
            }

            if (tUN == 'admin' && tPW == 'Hola!123') {
                this.cookies.setCookie("user", tUN, 1);
                this.cookies.setCookie("pass", tPW, 1);
                this.NavigateTo('initialscreen');
                return true
            }
        }
        return false;
    }

/////////////////////////////////////////////////////////////////////////////
    validatePass(pPassword) {
        if (this.patronPass.test(pPassword)) {
            if (this.debug) {
                console.log("validatePass() = true")
            }
            return true
        } else {
            if (this.debug) {
                console.log("validatePass() = false")
            }
            return false;
        }
    }
/////////////////////////////////////////////////////////////////////////////
    forgotPass() {
        if (this.debug) {
            console.log("forgotPass()");
        }
        //Envio de correo al servidor, si hubiera
        this.NavigateTo("EmailSend")
    }
/////////////////////////////////////////////////////////////////////////////
    checkCredentials() {
        if (this.win.location.href != "http://localhost:63342/ejemplo/index.html") {
            var user = this.cookies.getCookie("user");
            var pass = this.cookies.getCookie("pass");
            if (this.debug) {
                console.log("user = " + user + "// pass = " + pass);
            }
            if (user == 'admin' && pass == 'Hola!123') {
                if (this.debug) {
                    console.log("checkCredentials() = true");
                }
                return true
            } else {
                if (this.debug) {
                    console.log("checkCredentials() = fale");
                }
                this.NavigateTo("login")
                return false
            }
        }
    }

/////////////////////////////////////////////////////////////////////////////
    NavigateTo(pScreen) {
        if (this.debug) {
            console.log("NavigateTo(" + pScreen + ")");
        }
        if (pScreen == 'initialscreen') {
            this.win.location.href = "initialscreen.html";
        } else if (pScreen == 'forgetPass') {
            this.win.location.href = "forgotPassword.html";
        } else if (pScreen == 'EmailSend') {
            this.win.location.href = "emailSend.html";
        } else if (pScreen == 'login') {
            this.win.location.href = "index.html";
        }
    }
/////////////////////////////////////////////////////////////////////////////
    ValidateFields() {
        var tUN = this.GetScreenValue('username');
        var tPW = this.GetScreenValue('password');
        console.log('Validate fields' + tUN.length);

        if (!(tUN.length > 3)) {
            this.GenerateScreenErr('Usuario no válido');
            return false;
        }
        if (!(tPW.length > 3)) {
            this.GenerateScreenErr('Password  no válido');
            return false;
        }
        console.log("ValidateFields OK");
        return true;


    }
/////////////////////////////////////////////////////////////////////////////
    GetScreenValue(pFieldName) {
        var tS = this.doc.getElementById(pFieldName).value;
        console.log('________ ' + tS + '  ' + tS.length);
        return tS
    }
/////////////////////////////////////////////////////////////////////////////
    GenerateScreenErr(pMessage) {
        console.log('Error message ' + pMessage);
        // Alert
    }

}