import React from 'react';
import Iframe from 'react-iframe'
import IFrame from "./containers/IFrame";

const Causes = () => {
    const urls = ['https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/index.html'];
    return (
        <>

            <h3>What is COVID-19?</h3>

            <iframe width='100%' height="500" src="https://www.youtube.com/embed/OZcRD9fV7jo" frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            {
                urls.map((url, idx) => (
                <IFrame url={url}/>
                ))
            }
        </>

    )
};

export default Causes