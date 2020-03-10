var mStoreApp;
var mCookie;
var mUser;
var mUtils;
console.log('ssssshey');


function GetRandom(pMax){
    return pMax*Math.random()
}


window.onload= function(){

    if (document.readyState=="complete"){
        console.log("documento cargado");
        mStoreApp= new clsStoreApp(window, document, true);
    }
    /**
     * Por hacer
     *
     * Mostrar hora local
     *
     * Login 2 pasos
     *
     * lo del banco sabadell de las cordenadas
     *
     * Validar email
     */
    /**
     * Por si me aburro
     *
     * Validat DNI
     *
     * Setters
     *
     * validar por tipo
     *
     * captcha
     *
     * hacer JSDoc
     */
    /**
     * Hecho
     * Validate Password(8 char, 1Uper, 1Lowe, 1Sym)
     *
     * Pantalla forget password
     *
     *Crear la Initial Screen(dashboard)
     *
     */
  
}