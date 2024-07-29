const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try{
        await database.level.createMany({
            data: [
                { name: "Trial" },
               
                
            ]
        })

        console.log("Success")
    }catch (error){
        console.log("error seeding the category catalog")
    } finally {
        await database.$disconnect();
    }
}

main()