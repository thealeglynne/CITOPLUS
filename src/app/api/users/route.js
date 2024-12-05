import { NextResponse } from 'next/server';
import db from '@/libs/db';  // Asegúrate de tener configurado Prisma

export async function GET(request) {
  try {
    // Recuperar todos los usuarios desde la base de datos
    const users = await db.user.findMany();

    // Retornar los usuarios en formato JSON
    return NextResponse.json({ users });
  } catch (error) {
    // En caso de error, retornar un mensaje de error
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
