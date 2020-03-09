class clsStoreApp {
    constructor(pWin, pDoc, Cookie, pDebug) {
        this.doc = pDoc;
        this.win = pWin;
        this.cookies = Cookie;
        this.debug = pDebug;
        this.patronPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")

        this.checkCredentials()
    }

/////////////////////////////////////////////////////////////////////////////
    userLogin() {
        if (this.ValidateFields(1)){
            var tUN = this.GetScreenValue('username');

            if (tUN == 'admin') {
                this.cookies.setCookie("user", tUN);
                this.NavigateTo('pass');
                return true;
            }
        }
    }
/////////////////////////////////////////////////////////////////////////////
    passLogin() {
        if (this.ValidateFields(2)){
            var tPW = this.GetScreenValue('password');
        }

        if (tPW == 'Hola!123') {
            this.cookies.setCookie("pass", tPW);
            this.NavigateTo('initScreen');
            return true;
        }
    }
/////////////////////////////////////////////////////////////////////////////
    forgotPass() {
        if (this.debug) {
            this.GenerateConsoleErr("forgotPass()");
        }
        //Envio de correo al servidor, si hubiera
        this.NavigateTo("EmailSend")
    }
/////////////////////////////////////////////////////////////////////////////
    checkCredentials() {
        if (this.win.location.href != "http://localhost:63342/examenAure/user.html" || this.win.location.href != "http://localhost:63342/examenAure/pass.html") {
            var user = this.cookies.getCookie("user");
            var pass = this.cookies.getCookie("pass");
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
/////////////////////////////////////////////////////////////////////////////
    NavigateTo(pScreen) {
        if (this.debug) {
            this.GenerateConsoleErr("NavigateTo(" + pScreen + ")");
        }
        if (pScreen == 'initScreen') {
            this.win.location.href = "initialscreen.html";
        } else if (pScreen == 'forgetPass') {
            this.win.location.href = "forgotPassword.html";
        } else if (pScreen == 'EmailSend') {
            this.win.location.href = "emailSend.html";
        } else if (pScreen == 'login') {
            this.win.location.href = "user.html";
        }else if (pScreen == 'pass') {
            this.win.location.href = "pass.html";
        }
    }
/////////////////////////////////////////////////////////////////////////////
    ValidateFields(pMode) {
        if (pMode == 1){//validar usuario
            var tUN = this.GetScreenValue('username');
            if (!(tUN.length > 3)) {
                this.GenerateConsoleErr('Usuario no válido');
                return false;
            }
        }else if (pMode == 2){//validar pass
            var tPW = this.GetScreenValue('password');
            this.GenerateConsoleErr('Validate fields' + tPW.length);
            if (this.patronPass.test(tPW)) {
                this.GenerateConsoleErr('Password  no válido');
                return false;
            }
        }

        this.GenerateConsoleErr("ValidateFields OK");
        return true;
    }
/////////////////////////////////////////////////////////////////////////////
    GetScreenValue(pFieldName) {
        var tS = this.doc.getElementById(pFieldName).value;
        console.log("_" + tS);
        return tS
    }
/////////////////////////////////////////////////////////////////////////////
    GenerateConsoleErr(pMessage) {
        if (this.debug){
            console.log('#' + pMessage);
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    GenerateFormErr(pMessage) {
        if (this.debug){
            console.log('#' + pMessage);
        }
    }
/////////////////////////////////////////////////////////////////////////////
    validateEmail(){

    }

/////////////////////////////////////////////////////////////////////////////
///Basurero
/////////////////////////////////////////////////////////////////////////////
    Login() {
        if (this.ValidateFields() == true) {
            this.GenerateConsoleErr('Datos todo correcto ' + this.GetScreenValue('username'));
            var tUN = this.GetScreenValue('username');
            var tPW = this.GetScreenValue('password');



            if (tUN == 'admin' && tPW == 'Hola!123') {
                this.cookies.setCookie("user", tUN, 1);
                this.cookies.setCookie("pass", tPW, 1);
                this.NavigateTo('initScreen');
                return true
            }
        }
        return false;
    }
}