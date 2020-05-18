import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = props =>{

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        console.log(window.innerWidth)
        const scroll = document.documentElement.scrollTop
        const navBar = document.querySelector(".nav-bar")
        const navItem = document.querySelectorAll(".nav-item")
        if(window.innerWidth >= 1100){
            if(scroll > 100){
                navBar.style.position = "fixed"
                navBar.style.top = "0"
                navBar.style.backgroundColor = "#000000"
                navBar.style.height = "50px"
                navBar.style.margin = "0"
                navItem[0].style.position = "fixed"
                navItem[0].style.top = "18px"
                navItem[0].style.left = "65vw"
                navItem[1].style.position = "fixed"
                navItem[1].style.top = "18px"
                navItem[1].style.left = "80vw"
            }else{
                navBar.style.position = "static"
                navBar.style.top = "0"
                navBar.style.height = "50px"
                navBar.style.margin = "20px 0"
                navBar.style.backgroundColor = "#ffffff"
                navItem[0].style.position = "static"
                navItem[0].style.top = "0"
                navItem[0].style.left = "0"
                navItem[1].style.position = "static"
                navItem[1].style.top = "0"
                navItem[1].style.left = "0"
            }
        }  
    }

    return (
        <div className="nav">
            <div className="nav-title">
                <a href="/"><h1>P<div className="nav-pokeball"></div>kédex</h1></a>
                <div className="nav-anime"></div>
            </div>
            <div className="nav-bar">
                <nav>
                    <ul>
                        <li className="nav-item"><NavLink className="nav-link" to="/pokemon" activeClassName="selected">Pokémon</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/games" activeClassName="selected">Games</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navigation;