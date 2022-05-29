import React from 'react'
import { useSession} from "next-auth/react"

export default function Message({message}) {
    const { data: session } = useSession()
    console.log(session);
    return (<h1>{message.text}</h1>
    )
}


