'use client'

import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link';

import { MainContext } from '../Context/MainContext';
import { checkHasClass } from '../helper/checkHasClass';

const Menu = ({}) => {

    const {darkMode, setDarkMode} = useContext(MainContext);

    const [window_, setWindow_] = useState(0);

    const [markItem, setMarkItem] = useState("none");
    const [markCloseItem, setMarkCloseItem] = useState("none");
    const [markShowItem, setMarkShowItem] = useState("none");

    const [markSearch, setMarkSearch] = useState("none");
    const [markCloseSearch, setMarkCloseSearch] = useState("none");
    const [markShowSearch, setMarkShowSearch] = useState("none");

    const [wrapSearch, setWrapSearch] = useState("none");
    const [wrapItemMb, setWrapItemMb] = useState("none");
    const [wrapItem, setWrapItem] = useState("none");

    const [searchBorder, setSearchBorder] = useState("");

    const { width } = useWindowDimensions();
    const [typeWindow, setTypeWindow] = useState(0); 

    const [isFocus, setIsFocus] = useState(false);




    useEffect(() => {

        if (typeof window !== "undefined") {
            setWindow_(window);
        }
        setTimeout(() => {
            if (typeof window !== "undefined" && window_ == 0) {
                setWindow_(window);
            }
        }, 1300);

    }, [])


    useEffect(() => {
        if (typeof window !== "undefined") {
            ResizeMenu()
        }
    }, [window_])


    useEffect(() => {
        if(!isFocus){
        ResizeMenu();
        if(typeWindow != checkType(window_.innerWidth)){
            setTypeWindow(checkType(width));
            ResizeMenu();
            console.log("resize");
        }
        }
    }, [width]);


    function useWindowDimensions() {
        const [width, setWidth] = React.useState(window_.innerWidth);
      
        const updateWidthAndHeight = () => {
          setWidth(window_.innerWidth);
        };
      
        useEffect(() => {
          window.addEventListener("resize", updateWidthAndHeight);
          return () => window.removeEventListener("resize", updateWidthAndHeight);
        });
      
        return {
          width,
        }
    }

    function hideItemBar(){
        setMarkCloseItem("none")
        setMarkShowItem("block")
        setWrapItemMb("none");
    }
    function showItemBar(){
        setMarkCloseItem("block")
        setMarkShowItem("none")
        setWrapItemMb("flex");
    }
    function hideSearchBar(){
        setMarkCloseSearch("none")
        setMarkShowSearch("block")
        setWrapSearch("none");
    }
    function showSearchBar(){
        setMarkCloseSearch("block")
        setMarkShowSearch("none")
        setWrapSearch("block");
    }




    function changeCssMobileMenu(){
        setMarkItem("block")
        setMarkSearch("block")
        setWrapItem("none")

        hideItemBar();
        hideSearchBar();
    }
    function changeCssLargephonesMenu(){
        setMarkItem("block")
        setMarkSearch("block")
        setWrapItem("none")

        hideItemBar();
        hideSearchBar();
    }

    function changeCssTabletMenu(){
        setMarkItem("none")
        setWrapItem("block")
        setWrapItemMb("none")
        setMarkSearch("none")
        setWrapSearch("block")
    }
    function changeCssPcMenu(){
        setMarkItem("none")
        setWrapItem("block")
        setWrapItemMb("none")
        setMarkSearch("none")
        setWrapSearch("block")
    }

    //CHECK TYPE SCREEN: AND SET SCREEN:
    const changeDisplayMenu = (xtype) => {
        if(xtype == 1){
            changeCssMobileMenu()
        }else if(xtype == 2){
            changeCssLargephonesMenu()
        }else if(xtype == 3){
            changeCssTabletMenu()
        }else {
            changeCssPcMenu()
        }
    }

    const ResizeMenu = () => {
        let type;
        if (window_.innerWidth <=  650){
            type = 1;
        }else if((window_.innerWidth <=  820) && (window_.innerWidth >  650)){
            type = 2;
        }else if((window_.innerWidth <=  900) && (window_.innerWidth >  820)){
            type = 3; 
        }else{
            type = 4;
        } 
        changeDisplayMenu(type);
    }

    function checkType(dix){
        let type;
        if (dix <=  650){
            type = 1;
        }else if((dix <=  820) && (dix >  650)){
            type = 2;
        }else if((dix <=  900) && (dix >  820)){
            type = 3; 
        }else{
            type = 4;
        } 
        return type;
    }




    var MenuClick = function(event) {
        var x = event.target;
        if(x.id == "mark-search"){
            hideItemBar();
            if(wrapSearch == "none") showSearchBar(); 
            else hideSearchBar(); 
        }else if(x.id == "mark-item"){
            hideSearchBar(); 
            if(wrapItemMb == "none") showItemBar(); 
            else hideItemBar();
        }else if(checkHasClass(x, 'search-button')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-item-mb')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-search')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-profile')){
            //No ACT
        }else{
            if (window_.innerWidth <=  650){
                hideItemBar();
                hideSearchBar();
            }else if((window_.innerWidth <=  820) && (window_.innerWidth >  650)){
                hideItemBar();
                hideSearchBar();
            }
        }
    };

    function searchBorder_Fu(){
        setSearchBorder("1pt solid cornflowerblue");
    }

    function out_searchBorder_Fu(){
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }

    useEffect(() => {
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }, [darkMode])

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getSearch();
        }
    }

    const changeMode = () => {
        setDarkMode(!darkMode);
    }

return (
<div className="wrap-bar" dark-mode={darkMode ? "true" : "false"} onClick={(e) => {MenuClick(e);}}>
    <div className="nav-bar" dark-mode={darkMode ? "true" : "false"}>

        <div className="fr-nav-bar">

            {/*LOGO*/}
            <Link href="/">
            <div className="wrap-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.48 160.05">
                    <rect className="cls-1" x="76.24" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="translate(-24.63 78.17) rotate(-33.48)"/>
                    <rect className="cls-2" x="25.19" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="matrix(0.84, 0.55, -0.55, 0.84, 54.53, -23.38)"/>
                </svg>
            </div>
            </Link>

            {/*ITEM DESKTOP*/}
            <div className="wrap-item" style={{display: wrapItem}}>
                <Link href='/anime/'><div>Anime</div></Link>
                <Link href='/movie/'><div>Phim</div></Link>
                <div className='light-bulb' onClick={() => {changeMode()}}> 
                    <svg viewBox="0 0 512 512">
                        <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/>
                        <path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/>
                        <path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/>
                        <path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/>
                        <path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/>
                        <path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/>
                        <path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/>
                        <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/>
                        <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/>
                    </svg>
                </div>
            </div>

            {/*BUTT0N DISPLAY ITEM*/}
            <div className="mark-item"  style={{display: markItem}} dark-mode={darkMode ? "true" : "false"}>
                <div id="mark-item"></div>
                <svg id="mark-show-item" style={{display: markShowItem}} height="100%" viewBox="0 0 512 512" width="100%" ><path d="m464.883 64.267h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 208.867h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 353.467h-417.766c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"/></svg>
                <svg id="mark-close-item" style={{display: markCloseItem}} height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
            </div>

            {/*BUTT0N DISPLAY ITEM*/}
            <div className="mark-search" dark-mode={darkMode ? "true" : "false"}>
                <div id="mark-search"></div>
                <svg id="mark-show-search" style={{display: markShowSearch}}  x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135" stroke="#000000" ><path  d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg>
                <svg id="mark-close-search" style={{display: markCloseSearch}} height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
            </div>



            {/*ITEM MOBILE*/}
            <div className="wrap-item-mb"  style={{display: wrapItemMb}} dark-mode={darkMode ? "true" : "false"}>
                <Link href='/anime/'><div>Anime</div></Link>
                <Link href='/movie/'><div>Phim</div></Link>
                <div className='light-bulb' onClick={() => {changeMode()}}> 
                    <svg viewBox="0 0 512 512">
                        <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/><path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/><path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/><path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/><path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/><path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/><path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/>
                        <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/>
                        <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/>
                    </svg>
                </div>

            </div>

            {/*SEARCH BAR*/}
            <div className="wrap-search"  style={{display: wrapSearch }}  dark-mode={darkMode ? "true" : "false"} >
                <div className="search-wall" onFocus={() => {searchBorder_Fu()}} onBlur={() => {out_searchBorder_Fu()}} style={{border: searchBorder}}>
                    <div onClick={() => getSearch()} className="search-button" >
                        <svg x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135"  stroke="#000000" ><path d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg>
                    </div>      
                    <div className="search-bar">
                        <input onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} id="search-bar" onKeyDown={(e) => {_handleKeyDown(e)}} type="text" placeholder="Tìm kiếm" spellCheck="false" enterKeyHint="done" autoComplete='off'/>
                    </div> 
                </div>
            </div>

        </div>

    </div>

</div>
  )
}

export default Menu