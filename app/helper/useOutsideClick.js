import React from 'react'
import { checkHasClass } from './checkHasClass';

export const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {

        const { target } = event;
        if(target !== window) { 
          const containsTarget = (ref?.current?.contains(target) || checkHasClass(event.target, 'dialog-confirm') );
          if(containsTarget) {
          }else{
            callback();
          }
        }
        // if (ref.current && !ref.current.contains(event.target) && !checkHasClass(event.target, 'dialog-confirm')) {
        //   callback();
        // }
      };
  
      document.addEventListener('click', handleClick, true);
  
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);
  
    return ref;
  };