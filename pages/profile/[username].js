import {useSession} from "next-auth/react"
import axios from "axios";
import Header from "../header/header";
import MessageOverview from "../Message/MessageOverview";

export default function Profile(req, res) {
    //const { username } = req.query
    const { data: session } = useSession();
    if (session) {
        axios.defaults.headers.get['token'] = session.access_token;
        axios.defaults.headers.post['token'] = session.access_token;
        axios.defaults.headers.put['token'] = session.access_token;
        axios.defaults.headers.delete['token'] = session.access_token;
    }
    axios.defaults.headers.post['content-type'] = 'text/json';
    axios.defaults.headers.get['content-type'] = 'text/json';
    axios.defaults.headers.delete['content-type'] = 'text/json';
    axios.defaults.headers.put['content-type'] = 'text/json';

    return <>
        <Header/>
            <main>
                <MessageOverview username={""}></MessageOverview>
            </main>

    </>
}
