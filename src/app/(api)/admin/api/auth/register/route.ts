
import bcrypt from 'bcrypt';
import { prisma } from '@/shared/lib/prisma';


export async function POST(request: Request) {
    const { email, password, name, role } = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ error: 'Користувач вже існує' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: name === 'ADMIN' ? 'ADMIN' : 'USER',
        },
    });

    const responseData = new Response(JSON.stringify({ message: 'Реєстрація успішна', user }), { status: 201 });


    return responseData;
}