import React from 'react';
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from 'react-redux';


const CustomScrollbars =React.forwardRef(({children, width,height , ...props},ref)=> {
    const { config } = useSelector(state=>state.ui);

    const style = {
        width, height,direction:"ltr"
    }

   

    const trackVerticalStyles = {position: "absolute", width: "6px", right: "2px", bottom: "2px", top: "2px", borderRadius: "3px"}

    if(config.direction === "rtl"){
        trackVerticalStyles["right"]="unset"
        trackVerticalStyles["left"]="2px"

    }
    const trackVertical = <div style={trackVerticalStyles}><div style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); height: 445px; transform: translateY(0px);"></div></div>
    return (
        <Scrollbars
        data-testid="Scrollbars"
        ref={ref}
        renderTrackVertical={()=>trackVertical}
        renderThumbHorizontal={() => <span></span>}
        style={style}
        {...props}
      >
    {children}
          </Scrollbars>
    
    )
})



export default CustomScrollbars;