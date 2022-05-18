import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios"


export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
    axios.defaults.headers.post['content-type'] = 'text/json';
    axios.defaults.headers.get['content-type'] = 'text/json';
    axios.defaults.headers.delete['content-type'] = 'text/json';
    axios.defaults.headers.put['content-type'] = 'text/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
