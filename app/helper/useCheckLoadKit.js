import  {useEffect} from 'react';
import Router from 'next/router';

export default function useCheckLoadKit(getData) {
    useEffect(() => {
        
        const routeChangeStart = url => {
            try {
                if(((getData.current.length == 1 || getData.current.length == 0) && (document.getElementsByClassName('text-notkit').item(0).innerHTML === ' ' || document.getElementsByClassName('text-notkit').item(0).innerHTML === '')) && String(document.getElementsByClassName('fr-text').item(0).innerHTML).length == 0){
                }else{
                    if (confirm("Bạn muốn rời trang?") == false) {
                        Router.events.emit("routeChangeError",  "your error message", "your-url", { shallow: false });
                        throw "Abort route change. Please ignore this error."
                    }
                }   
            } catch (error) {
                if(getData.current.length != 0){
                    Router.events.emit("routeChangeError",  "your error message", "your-url", { shallow: false });
                    throw "Abort route change. Please ignore this error."
                }
            }
        };

        Router.events.on('routeChangeStart', routeChangeStart);
        return () => {
            Router.events.off('routeChangeStart', routeChangeStart);
        };
    }, []);

    useEffect(() => {
        const beforeUnloadListener = (event) => {
            try {
                if(((getData.current.length == 1 || getData.current.length == 0) && (document.getElementsByClassName('text-notkit').item(0).innerHTML === ' ' || document.getElementsByClassName('text-notkit').item(0).innerHTML === '')) && String(document.getElementsByClassName('fr-text').item(0).innerHTML).length == 0){
                    window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
                }else{
                    event.preventDefault();
                    return event.returnValue = "Are you sure you want to exit?";
                }   
            } catch (error) {
                
            }
        };
        window.addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }, []);
    
}
