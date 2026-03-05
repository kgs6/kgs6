import {prisma} from "../../../../../../shared/lib/prisma";

export async function GET() {
    try {
        const news = await prisma.news.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                publishedAt: 'desc'
            },
            select :{
                title: true,
                description: true,
                publishedAt: true
            }
        });

        return Response.json(news, { status: 200 });
        
    } catch(error) {
        console.error(error);
        return Response.json({ error: 'Помилка сервера' }, { status: 500 });
    }
}