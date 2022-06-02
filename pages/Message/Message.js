import React from 'react'

const Message = ({message}) => {
    if (message === undefined){
        return <>
        <h1>Could not load message</h1>
        </>
    }
    else {
        return (<>
                <div className="border border-secondary">
                    <h1>{message.text}</h1>
                    <text>{message.creationDate}</text>
                </div>
            </>
        )
    }
}


export default Message;
