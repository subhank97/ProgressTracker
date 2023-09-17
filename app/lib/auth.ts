import { Session, getServerSession } from "next-auth"
import { JWT } from "next-auth/jwt"

type SessionParams = {
    session: Session
    token: JWT
}

export const session = async ({ session, token }: SessionParams) => {
    console.log('Server Session', { session, token })
    session.user.id = token.id
    return session
}

export const getUserSession = async () => {
    const authUserSession = await getServerSession({
        callbacks: {
            session
        }
    })
    if (!authUserSession) throw new Error('unauthorized')
    return authUserSession.user
}