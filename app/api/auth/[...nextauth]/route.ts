import NextAuth from "next-auth"
import GitHubProvider from 'next-auth/providers/github';
import { Session } from "next-auth"



const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ 
            session, 
        }: { 
            session: Session, 
        }) {
            return session;
        },
    },
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }