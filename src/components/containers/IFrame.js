import Iframe from "react-iframe";
import React from "react";


const IFrame = ({url}) => {
    return (
        <Iframe url={url}
            width="100%"
            className="iframe-custom"
            height="100vh"
        />
    )
}


export default IFrame
