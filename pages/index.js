import Head from 'next/head'
import Image from 'next/image'
import {useSession} from "next-auth/react"
import Header from "./header/header";
import axios from "axios";
import Register from "./account/register";
import Message from "./Message/Message";
import Chat from "./Message/Chat";
import MessageOverview from "./Message/MessageOverview";

export default function Home() {
  const { data: session } = useSession()
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
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BackendURL;

    return <>
      <Header/>
      {session != null && session.username == null &&
      <Register/>}
      {session != null && session.username && <div>
        <Head>
        </Head>

        <main>
          <MessageOverview username={"session.username"}></MessageOverview>
        <Chat></Chat>
        </main>
      </div>}
    </>
}
