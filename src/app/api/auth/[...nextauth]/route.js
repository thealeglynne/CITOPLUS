import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Proveedor de credenciales
import prisma from "@/libs/db"; // Asegúrate de que Prisma esté configurado correctamente
import bcrypt from "bcrypt";

// Configuración de NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials", // Nombre del proveedor
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Buscar el usuario por email en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Comparar la contraseña cifrada con la ingresada
        const isPasswordValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (!isPasswordValid) {
          console.log("Incorrect password");
          return null;
        }

        // Si las credenciales son correctas, devolver la información del usuario
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Variable de entorno para la clave secreta de NextAuth
  pages: {
    signIn: "/auth/login",  // Página personalizada de inicio de sesión
  },
  session: {
    strategy: "jwt", // Usa JSON Web Tokens para la gestión de sesiones
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario existe, agregamos sus datos al token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // En cada solicitud, agregamos la información del token a la sesión
      if (token) {
        session.id = token.id;
        session.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Exporta el handler para los métodos GET y POST
export { handler as GET, handler as POST };
