import React from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-awesome-reveal";
import { useState, useEffect, useRef } from 'react';
import Image1 from 'src/theme/demo1.png'
import Image2 from 'src/theme/demo2.png'
import Image3 from 'src/theme/demo3.png'
import Image4 from 'src/theme/demo4.png'
import Image5 from 'src/theme/demo5.png'
import Image6 from 'src/theme/demo6.png'
import Image7 from 'src/theme/demo7.png'

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // 保存新回调
    useEffect(() => {
        savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
        function tick() {
        savedCallback.current();
        }
        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay]);
}

const Home = () => {

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');
        
            script.src = url;
            script.async = true;
        
            document.body.appendChild(script);
        
            return () => {
                document.body.removeChild(script);
            }
        }, [url]);
    };

    useScript('homeJs/waypoints.js');
    useScript('homeJs/jquery.fittext.js');
    useScript('homeJs/magnific-popup.js');
    useScript('homeJs/init.js');

    const MAX_IMAGE = 7;
    // var rand = Math.floor(Math.random() * (MAX_IMAGE + 1));
    // rand++;
    // console.log(rand);
    
    const Images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];
    const [image, setImage] = useState(Image1);
    
    // if(rand == 1) Image = Image1;
    // else if(rand == 2) Image = Image2;
    // else if(rand == 3) Image = Image3;
    // else if(rand == 4) Image = Image4;

    useInterval(() => {
        var rand = Math.floor(Math.random() * (MAX_IMAGE + 1));
        rand++;
        console.log(rand);
        setImage(Images[rand]);
    }, 5000);

    return (
    <header id="home"
        style={{backgroundImage: `url(${image?image:Image1})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: 'center'}}
    >
        <link rel="stylesheet" href="/homeCss/default.css"/>
        <link rel="stylesheet" href="/homeCss/layout.css"/>
        <link rel="stylesheet" href="/homeCss/media-queries.css"/>
        <link rel="stylesheet" href="/homeCss/magnific-popup.css"/>
        {/* <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script> */}
        {/* <script src="homeJs/jquery.flexslider.js"></script>
        <script src="homeJs/waypoints.js"></script>
        <script src="homeJs/jquery.fittext.js"></script>
        <script src="homeJs/magnific-popup.js"></script>
        <script src="homeJs/init.js"></script> */}

        {/* <ParticlesBg type="circle" bg={true} /> */}

        <div className="row banner">
            <div className="banner-text">
                <Fade bottom>
                <h1 className="responsive-headline">
                    IoTwebsite
                </h1>
                </Fade>
                <Fade bottom duration={1200}>
                <h3>
                    An IoT cloud platform built on React (with Material UI) + Express + MySQL.  It's my final project in the course B/S Arch Software Design at ZJU.
                </h3>
                <h3>
                    Sign in or sign up to enter the platform and manage your IoT devices. Click 'VTU' to visit my personal website. Click 'Github' to see the source code.
                </h3>
                </Fade>
                <hr />
                <Fade bottom duration={1500}>
                    <ul className="social" style={{display: 'flex', justifyContent: 'center'}}>
                        <a
                            href="/register"
                            className="button btn"
                            // style={{marginRight: 3 + 'em'}}
                        >
                            <i className="fa fa-pencil"></i>Sign Up
                        </a>
                        <a href="/login" className="button btn">
                            <i className="fa fa-sign-in"></i>Sign In
                        </a>
                    </ul>
                </Fade>
                <Fade bottom duration={1500}>
                    <ul className="social" style={{display: 'flex', justifyContent: 'center'}}>
                        <a href="http://vtu.life" style={{marginRight: 1.6 + 'em', marginLeft: 0 + 'em'}}>
                            <i className="fa fa-link"></i>VTU
                        </a>
                        <a href="https://github.com/vtu81/IoTwebsite" style={{marginLeft: 1 + 'em'}}>
                            <i className="fa fa-github"></i>Github
                        </a>
                    </ul>
                </Fade>
            </div>
        </div>
    </header>
    );
}

export default Home;