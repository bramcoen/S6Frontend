import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios"


export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {

    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
