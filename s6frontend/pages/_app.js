import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios"
export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
    axios.defaults.headers.post['content-type'] = 'text/json';
    axios.defaults.headers.get['content-type'] = 'text/json';
    axios.defaults.headers.put['content-type'] = 'text/json';
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
