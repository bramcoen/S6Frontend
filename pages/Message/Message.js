import React from 'react'

export default function Message({message}) {
    return (<>

    <div className="border border-secondary">
    <h1>{message.text}</h1>
            <text>{message.creationDate}</text>
</div>
        </>
    )
}
