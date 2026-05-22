import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const loginAttempts = new Map<string, { count: number; time: number }>()

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null

        // Rate limiting: max 5 attempts per 15 minutes per IP
        const ip = (req?.headers?.['x-forwarded-for'] as string) || 'unknown'
        const now = Date.now()
        const attempts = loginAttempts.get(ip)
        if (attempts && attempts.count >= 5 && now - attempts.time < 15 * 60 * 1000) {
          return null
        }

        const adminUsername = process.env.ADMIN_USERNAME || 'admin'
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''

        if (credentials.username !== adminUsername) {
          loginAttempts.set(ip, { count: (attempts?.count || 0) + 1, time: now })
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash)
        if (!isValid) {
          loginAttempts.set(ip, { count: (attempts?.count || 0) + 1, time: now })
          return null
        }

        loginAttempts.delete(ip)
        return { id: '1', name: 'Admin', email: 'admin@totoaluminium.com' }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
}
