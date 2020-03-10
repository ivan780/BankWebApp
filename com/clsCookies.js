class clsCookies {
    /**
     *
     * @param{Document} pDoc
     */
    constructor(pDoc) {
        this.Doc = pDoc;
    }
/////////////////////////////////////////////////////////////////////////////
    /**
     *
     * @param {String} pName
     * @param {Number} pValue
     */
    setCookie(pName, pValue) {
        var d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        this.Doc.cookie = pName + "=" + pValue + ";" + expires + ";path=/";
    }

    /**
     *
     * @param {String} pName
     * @returns {string}
     */
    getCookie(pName) {
        var name = pName + "=";
        var decodedCookie = decodeURIComponent(this.Doc.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}