class clsStoreApp{
    constructor(pWin, pDoc){
        this.doc=pDoc;
        this.win=pWin;
        // CheckCredentials()
    }
/////////////////////////////////////////////////////////////////////////////
    Login(){
        if (this.ValidateFields()==true){
            console.log('Datos todo correcto '+ this.GetScreenValue('username') );
            var tUN= this.GetScreenValue('username');
            var tPW= this.GetScreenValue('password');
            if (this.validatePass(tPW)){
                return false;
            }

            if (tPW=='Hola!123' && tUN=='admin'){
                this.NavigateTo('initialscreen');
                return true
            }
            //validar DNI,
        }
        return false;
    }
/////////////////////////////////////////////////////////////////////////////
    validatePass(pPassword){
            if (pPassword.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')){
                return true
            }else {
                return false;
            }
    }

/////////////////////////////////////////////////////////////////////////////
    forgotPass(){

    }
/////////////////////////////////////////////////////////////////////////////
    NavigateTo(pScreen){
        if (pScreen=='initialscreen'){
            this.win.location.href = "initialscreen.html";
        }

    }
/////////////////////////////////////////////////////////////////////////////
    ValidateFields(){
        var tUN= this.GetScreenValue('username');
        var tPW= this.GetScreenValue('password');
        console.log('Validate fields' + tUN.length);

        if (!(tUN.length>3)){
            this.GenerateScreenErr('Usuario no válido');
            return false;
        }
        if (!(tPW.length>3)){
            this.GenerateScreenErr('Password  no válido');
            return false;
        }
        console.log("ValidateFields OK");
        return true;
       

    }
/////////////////////////////////////////////////////////////////////////////set?, vldate  for type, captcha
    GetScreenValue(pFieldName){
        var tS=this.doc.getElementById(pFieldName).value;
        console.log('________ '+tS + '  ' + tS.length);
        return tS
    }
/////////////////////////////////////////////////////////////////////////////multi etapa
    GenerateScreenErr(pMessage){
        console.log('Error message ' + pMessage);
        // Alert
    }

}