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
    userLogin() {
        if (this.ValidateFields(1)){
            var tUN = this.GetScreenValue('username');

            if (tUN == 'admin') {
                this.cookies.setCookie("user", tUN);
                this.NavigateTo('initialscreen');
                return true;
            }
        }
    }
/////////////////////////////////////////////////////////////////////////////
    passLogin() {
        if (this.ValidateFields(2)){

        }
    }
/////////////////////////////////////////////////////////////////////////////
    Login() {
        if (this.ValidateFields() == true) {
            console.log('Datos todo correcto ' + this.GetScreenValue('username'));
            var tUN = this.GetScreenValue('username');
            var tPW = this.GetScreenValue('password');



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
    forgotPass() {
        if (this.debug) {
            console.log("forgotPass()");
        }
        //Envio de correo al servidor, si hubiera
        this.NavigateTo("EmailSend")
    }
/////////////////////////////////////////////////////////////////////////////
    checkCredentials() {
        if (this.win.location.href != "http://localhost:63342/examenAure/index.html") {
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
    ValidateFields(pMode) {
        if (pMode == 1){//validar usuario
            var tUN = this.GetScreenValue('username');
            if (!(tUN.length > 3)) {
                this.GenerateScreenErr('Usuario no válido');
                return false;
            }
        }else if (pMode == 2){//validar pass
            var tPW = this.GetScreenValue('password');
            console.log('Validate fields' + tUN.length);
            if (this.patronPass.test(tPW)) {
                this.GenerateScreenErr('Password  no válido');
                return false;
            }
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
/////////////////////////////////////////////////////////////////////////////
    validateEmail(){

    }

/////////////////////////////////////////////////////////////////////////////
///Basurero
/////////////////////////////////////////////////////////////////////////////

}