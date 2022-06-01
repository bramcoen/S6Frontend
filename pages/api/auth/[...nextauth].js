import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"
import {isEmpty} from "yarn/lib/cli";

export default (req, res) => {
    let options = {
        // Configure one or more authentication providers
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
        ],
        secret: process.env.JWT_SECRET,
        callbacks: {
            async redirect({ url, baseUrl }) {
                // Allows relative callback URLs
                if (url.startsWith("/")) return `${baseUrl}${url}`
                // Allows callback URLs on the same origin
                else if (new URL(url).origin === baseUrl) return url
                return baseUrl
            },
            async signIn({ user, account, profile, credentials, session }) {
                const isAllowedToSignIn = true
                if (isAllowedToSignIn) {
                    if (account.provider === 'google') {
                      await GetUsername(profile.id_token); //gets the username of the user, this step is a workaround and should be mitigated.
                        //The username can't be send to the session step and therefor we should check here if the backend service is available.

                        return true;
                    }
                    // Return false to display a default error message
                    return false;
                    // Or you can return a URL to redirect to:
                    // return '/unauthorized'
                }
            },

           async jwt({ token, user, account, profile, isNewUser }){
                // Persist the OAuth access_token to the token right after signin
                if (user) {
                    token.access_token = account.id_token;
                    if (user.email){
                        token.email = user.email;
                    }
                }

                return token
            },

            async session({ session, user, token }) {
                session.access_token = token.access_token
                    let username = await GetUsername(token.access_token);
                    if (username != null && username !== "") {
                        session.username = username;
                    }
                return session
            }
        }}
    return NextAuth(req, res, options)
}
//Kept for reference
/*
async function RegisterToken(tkn,validUntil,providerId,email){
    var t = null;
    if (validUntil != null) {
        t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(validUntil);
    };
    let user = JSON.stringify({
        token: {
            value: tkn,
            validUntil: t
        },
        provideraccountid: providerId,
        email: email
    });

    let amqp = require('amqplib-rabbitmq');

    const publisher = new amqp('amqp://guest:guest@143.198.251.117:5672', {
        queueName: 'token',
        routeKey: 'new',
        exchange: 'token', // default value is defaultExchange
    });
    await publisher.sendMessageByRoute(user)
};*/
async function GetUsername(backendToken){
    if (backendToken) {
        let username = "";
        const instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BackendURL,
            timeout: 10300
        });
        instance.defaults.headers.common['token'] = backendToken;
     await instance.get( "user/me").then(json => {
          username = json.data.name;
        }).catch(i => console.log(i))
        return username;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
