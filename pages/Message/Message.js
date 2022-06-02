import React from 'react'

const Message = ({message}) => {
    return (<>
    <div className="border border-secondary">
        {message !== undefined &&  <h1>{message.text}</h1> && <text>{message.creationDate}</text>}
</div>
        </>
    )
}


export default Message;
