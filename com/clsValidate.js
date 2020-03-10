class clsValidate {
    /**
     * @param {clsStoreApp} pParent
     */
    constructor(pParent) {
        this.parent = pParent;

        this.patronPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");
        this.patronEmail = new RegExp("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$");
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pEmail
     * @returns {boolean}
     */
    _email(pEmail){
        if (this.patronEmail.test(pEmail)){
            this.parent.GenerateConsoleErr("email valido");
            return true
        }
        this.parent.GenerateConsoleErr("email invalido");
        return false
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string}pPass
     * @return boolean
     */
    _pass(pPass){
        if (this.patronPass.test(pPass)){
            this.parent.GenerateConsoleErr("contraseña valida")
            return true
        }
        this.parent.GenerateConsoleErr("contraseña invalida")
        return false
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     * @param {string} pUser
     * @return {boolean}
     */
    _user(pUser){
        if (pUser.length > 3){
            this.parent.GenerateConsoleErr("usuario valido")
            return true
        }
        this.parent.GenerateConsoleErr("usuario invalida")
        return false
    }
}