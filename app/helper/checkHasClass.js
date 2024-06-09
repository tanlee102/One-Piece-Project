 export const checkHasClass = (x, nameClass) => {
    if(x){
        if(String(x.className).includes(nameClass)){
            return true;
        }else{
            return checkHasClass(x.parentNode, nameClass);
        }
    }else{
        return false;
    }
}