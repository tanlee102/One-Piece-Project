export const hideMainScrollBar = (display) => {
    if (/Mobi/.test(navigator.userAgent)) {}else{
        if(display){ 
          document.body.style.overflowY = "hidden" ; 
          document.getElementsByTagName('html').item(0).style.paddingRight = "10px"; 
    
          document.getElementsByClassName('wrap-bar').item(0).style.paddingRight = "10px"; 
          document.getElementsByClassName('wrap-bar').item(0).style.width = "calc(100% - 10px)"
        }else { 
          document.body.style.overflowY = "scroll" ; 
          document.getElementsByTagName('html').item(0).style.paddingRight = "0px"; 
    
          document.getElementsByClassName('wrap-bar').item(0).style.paddingRight = "0px"; 
          document.getElementsByClassName('wrap-bar').item(0).style.width = "100%"
        }
    }
};


