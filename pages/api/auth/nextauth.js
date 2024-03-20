import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { prisma } from "../../../prismaClient"; // Prisma 클라이언트 임포트
import bcrypt from "bcrypt"; // 비밀번호 해싱을 위한 bcrypt

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.hashedPassword))
        ) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          throw new Error("Credentials incorrect");
        }
      },
    }),
  ],
  // NextAuth.js 추가 설정...
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 예시로, user 객체에 id가 있다고 가정
        // 필요한 사용자 정보를 token에 추가
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // JWT 콜백에서 설정한 token.id를 세션에 추가
      // session에 필요한 추가 데이터를 포함시킬 수 있음
      return session;
    },
  },
});
