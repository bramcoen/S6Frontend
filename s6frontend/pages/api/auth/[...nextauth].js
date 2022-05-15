import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"

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
                        await RegisterToken(account.access_token, account.expires_at);
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
                    token.accessToken = user.access_token;
                }
                return token
            },

            async session({ session, user, token }) {
                session.accessToken = token.accessToken
                return session
            }
        }}
    return NextAuth(req, res, options)
}
async function RegisterToken(tkn,validUntil){
    let user = JSON.stringify({
        token: tkn,
        validUntil: validUntil
    });

    let amqp = require('amqplib-rabbitmq');

    const publisher = new amqp('amqp://guest:guest@localhost:5672', {
        queueName: 'message',
        routeKey: 'new',
        exchange: 'message', // default value is defaultExchange
    });
    await publisher.sendMessageByRoute(user)
};
/*
   // export default (req, res, options) => NextAuth(req, res, options)
async function getTokenFromYourAPIServer(email, name){
    let jsonToken;
    let user = JSON.stringify({
        email: email,
        name: name
    });
    console.log(email)
    console.log(user)
    axios.get(process.env.BackendUserURL+ "user/token", user,).then(json => {
        jsonToken = json}).catch(i => console.log(i));
    return jsonToken;
}
async function registerUser(email,reference,name){
    let user = JSON.stringify({
        email: email,
        name: name,
        reference: reference
    });
    axios.post(process.env.BackendUserURL+ "user/register" ,user).catch(i => console.log(i))
}
*/
