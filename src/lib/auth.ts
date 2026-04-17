import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ profile }: any) {
      const allowed =
        process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

      return allowed.includes(profile?.email || "");
    },
    async jwt({ token, profile }: any) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export const auth = authOptions;
export default handler;