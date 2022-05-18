import Head from 'next/head'
import Image from 'next/image'
import {useSession} from "next-auth/react"
import Header from "./header/header";
import axios from "axios";
import { getCookie } from 'cookies-next';
import Register from "./account/register";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    axios.defaults.headers.get['token'] = session.access_token;
    axios.defaults.headers.post['token'] = session.access_token;
    axios.defaults.headers.put['token'] = session.access_token;
    axios.defaults.headers.delete['token'] = session.access_token;
  }

    return <>
      <Header/>
      {session != null && session.username == null &&
      <Register/>}
      {session != null && session.username && <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main>

        </main>

        <footer>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            Powered by{' '}
            <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
          </a>
        </footer>
      </div>}
    </>
}
