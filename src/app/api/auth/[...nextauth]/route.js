import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'; // Corrección de importación
import prisma from '@/libs/db'; // Asegúrate de tener la configuración de Prisma
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verificar si el usuario existe en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log("Incorrect password");
          return null;
        }

        // Si todo es correcto, devuelve la información del usuario
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de que esté configurado
  pages: {
    signIn: "/auth/login",  // Página personalizada de inicio de sesión
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
