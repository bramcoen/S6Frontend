import React from 'react'

const Message = ({message}) => {
    return (<>
    <div className="border border-secondary">
            <text>{message.creationDate}</text>
</div>
        </>
    )
}


export default Message;
