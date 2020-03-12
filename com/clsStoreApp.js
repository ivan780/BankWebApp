class clsStoreApp {
    /**
     * @param {Window} pWin
     * @param {Document} pDoc
     * @param {boolean} pDebug
     */
    constructor(pWin, pDoc, pDebug) {
        this.doc = pDoc;
        this.win = pWin;
        this.debug = pDebug;

        this.patronPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
        this.patronEmail = new RegExp("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$");

        this.Cookies = new clsCookies(this);
        this.User = new clsUser(this);
        this.Validate = new clsValidate(this);
        this.captcha = new clsCaptcha(this);


        this.GenerateConsoleMessage("clsStoreApp creado");
        this.User.checkCredentials();
    }

/////////////////////////////////////////////////////////////////////////////
    /**
     * @return {boolean}
     */
    userLogin() {
        if (this.captcha.validateCaptcha()){
            var tUN = this.GetScreenValue('username');
            if (this.Validate._user(tUN)){

                if (this.User.checkUser(tUN)) {
                    this.Cookies.setCookie("user", md5(tUN) );
                    this.NavigateTo('pass');
                    return true;
                }else {
                    this.ShowError("erroDivUser");
                }
            }else {
                this.ShowError("erroDivUser");
            }
        }else {
            this.ShowError("erroDivCaptcha");
        }
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @return {boolean}
     */
    passLogin() {
        var tPW = this.GetScreenValue('password');
        if (!this.Validate._pass(tPW)) {

            if (this.User.checkPass(tPW)) {
                this.Cookies.setCookie("pass", md5(tPW) );
                this.NavigateTo('initScreen');
                return true;
            }else {
                this.ShowError("erroDivPass");
            }
        }else {
            this.ShowError("erroDivPass");
        }
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @return {boolean}
     */
    forgotPass() {
        this.GenerateConsoleLog("forgotPass()");
        if (this.Validate._email(this.GetScreenValue("email"))){
            this.NavigateTo("EmailSend")
            return true;
            //Envio de correo al servidor, si hubiera
        }else {
            this.ShowError("erroDivEmail");
        }
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pScreen
     */
    NavigateTo(pScreen) {
        this.GenerateConsoleLog("NavigateTo(" + pScreen + ")");

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
    /**
     *
     * @param {string} pFieldName
     * @return {*}
     */
    GetScreenValue(pFieldName) {
        var tS = this.doc.getElementById(pFieldName).value;
        console.log("_" + tS);
        return tS
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {string} pFieldName
     * @return {*}
     */
    GetScreenElement(pFieldName) {
        var tS = this.doc.getElementById(pFieldName);
        console.log("_" + pFieldName);
        return tS
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pMessage
     */
    GenerateConsoleLog(pMessage) {
        if (this.debug){
            console.log('#' + pMessage);
        }
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pMessage
     */
    GenerateConsoleMessage(pMessage) {
            console.log('$' + pMessage);
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pDivId
     */
    ShowError(pDivId) {
        var div = this.GetScreenElement(pDivId)
        if (div.style.display == "none"){
            div.style.display = "block";
        }else {
            div.style.display = "none";
        }
    }
/////////////////////////////////////////////////////////////////////////////
///Basurero
/////////////////////////////////////////////////////////////////////////////
    Login() {
        if (this._ValidateFields() == true) {
            this.GenerateConsoleLog('Datos todo correcto ' + this.GetScreenValue('username'));
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
/////////////////////////////////////////////////////////////////////////////
    ValidateFields(pMode) {
        if (pMode == 1){//validar usuario
            var tUN = this.GetScreenValue('username');
            if (!(tUN.length > 3)) {
                this.GenerateConsoleLog('Usuario no válido');
                return false;
            }
        }else if (pMode == 2){//validar pass
            var tPW = this.GetScreenValue('password');
            this.GenerateConsoleLog('Validate fields' + tPW.length);
            if (this.patronPass.test(tPW)) {
                this.GenerateConsoleLog('Password  no válido');
                return false;
            }
        }

        this.GenerateConsoleLog("ValidateFields OK");
        return true;
    }
}