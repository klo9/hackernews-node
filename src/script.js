const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// all queries go here
async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'i still dont wtf im doing',
            url: 'www.howtographql.com',
        },
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()  // close db connection when script terminates
    })