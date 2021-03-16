import React from "react";
import image from "../../Images/logo.jpg"
import "./StyleGuide.css"

const StyleGuide = () => {
    return (
        <div>

            <h1> Style Guide </h1>
            <h3 className = "heading"> Logo &#x26; Icon </h3>
            <img src = {image} alt = "logo" className = "logosize"/>


            <h3 className = "heading"> Fonts</h3>

            <p className = "font1h"> 
                Type: Rubik Mono One, Position: Heading 1, Size: 100px
            </p>
            <p className = "font1">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz
            </p>
 

            <p className = "font2h">
                Type: Rubik One, Position: Heading 2, Size: 30px
            </p>
            <p className = "font2">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz      
            </p>     
            

            <p className = "font3h">
                Type: Reem Kufi, Position: Heading 3, Size: 20px
            </p>
            <p className = "font3">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
                Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                Uu Vv Ww Xx Yy Zz      
            </p>             
            


            <h3 className = "heading"> Colors</h3>

            <p> Color: Green, RGB: (111, 211, 151), Hex: #6FD397, Location: Foreground </p>
            <div className = "Green"> </div>

            <p> Color: Light Yellow, RGB: (254, 255, 246), Hex: #FEFFF6, Location: Background </p>
            <div className = "LightYellow"></div>

            <p> Color: Dark Green, RGB: (89, 163, 118), Hex: #59A376, Location: Background </p>
            <div className = "DarkGreen"></div>

            <p>Color: White, RGB: (255, 255, 255), Hex: #FFFFFF, Location: Background, Title Text, Icons </p>
            <div className = "White"></div>

            <p> Color: Black, RGB: (0, 0, 0), Hex: #000000, Location: Body Text</p>
            <div className = "Black"></div>
        </div>
    )

}

export default StyleGuide