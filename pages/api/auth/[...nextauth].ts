import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import CheckUserEmailPassword from "src/core/product/actions/checkUserEmailPassword";
import OAUthToDbUser from "src/core/product/actions/oAUthToDbUser";
import { ProviderProducts } from "src/infra/provider/providerProducts";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface User {
      id?: string
      _id: string
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
         email: { label: 'correo', type: 'email', placeholder: 'correo@google.com'},
         password: { label: 'correo', type: 'password', placeholder: 'Contraseña'},
      },
      async authorize(credentials) {
        const checkUserEmailPassword = new CheckUserEmailPassword(
        );
        const result: any = await checkUserEmailPassword.execute(credentials!.email, credentials!.password );
        if (result.error) return null;

        return result.user;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    /*FacebookProvider({ 
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
    }) */
  ],
  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {

  },
  session: {
    maxAge: 2592000, /// 30d 
    strategy: 'jwt',
    updateAge: 86400 // Cada dia
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if(account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            const providerProducts = new ProviderProducts()
            const oAUthToDbUser = providerProducts.get_OAUthToDbUser();
            token.user = await oAUthToDbUser.execute(user?.email || '', user?.name || '');
            break;
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }
      }

      return token
    },
    async session ({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session; 
    }
  }
}
export default NextAuth(authOptions)