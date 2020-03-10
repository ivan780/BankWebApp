class clsStoreApp {
    constructor(pWin, pDoc, pDebug) {
        this.doc = pDoc;
        this.win = pWin;
        this.debug = pDebug;

        this.patronPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
        this.patronEmail = new RegExp("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$");

        this.Cookies = new clsCookies(this.doc);
        this.User = new clsUser(this.doc, this);

        this.GenerateConsoleMessage("clsStoreApp creado");
        this.User.checkCredentials();
    }

/////////////////////////////////////////////////////////////////////////////
    userLogin() {
        if (this.ValidateFields(1)){
            var tUN = this.GetScreenValue('username');

            if (this.User.checkUser(tUN)) {
                this.Cookies.setCookie("user", tUN);
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

        if (this.User.checkPass(tPW)) {
            this.Cookies.setCookie("pass", tPW);
            this.NavigateTo('initScreen');
            return true;
        }
    }
/////////////////////////////////////////////////////////////////////////////
    forgotPass() {
        this.GenerateConsoleErr("forgotPass()");
        if (this.validateEmail(this.GetScreenValue("email"))){
            this.NavigateTo("EmailSend")
            //Envio de correo al servidor, si hubiera
        }

    }
/////////////////////////////////////////////////////////////////////////////
    NavigateTo(pScreen) {
        this.GenerateConsoleErr("NavigateTo(" + pScreen + ")");

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
    GenerateConsoleMessage(pMessage) {
            console.log('$' + pMessage);
    }
/////////////////////////////////////////////////////////////////////////////
    GenerateFormErr(pMessage) {
        if (this.debug){
            console.log('#' + pMessage);
        }
    }
/////////////////////////////////////////////////////////////////////////////
    validateEmail(pEmail){
        if (this.patronEmail.test(pEmail)){
            this.GenerateConsoleErr("email valido");
            return true
        }
        this.GenerateConsoleErr("email invalido");
        return false
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
                this.Cookies.setCookie("user", tUN, 1);
                this.Cookies.setCookie("pass", tPW, 1);
                this.NavigateTo('initScreen');
                return true
            }
        }
        return false;
    }
}