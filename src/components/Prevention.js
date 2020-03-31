import React from 'react';
import IFrame from "./containers/IFrame";

const Prevention = () => {
    const urls = ['https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public'];
    return (
        <>
            {
                urls.map((url, idx) => (
                <IFrame url={url}/>
                ))
            }
        </>

    )
};

export default Prevention