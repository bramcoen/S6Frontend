import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios"


export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
    axios.defaults.baseURL = "https://s6.coenders.party";
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
