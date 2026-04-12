import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import Link from "next/link";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";


const TeacherPage = async () => {
   const { userId } = auth()

   if(!userId){
     return redirect("/")
   }

   const courses = await db.course.findMany({
        where: {
            userId    
        },
        orderBy: {
            createdAt: "desc"
        }
   })

    return ( 
        <div className="p-6">
            <Link href="/teacher/courses/create">
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    New Course
                </Button>
            </Link>
            <DataTable columns={columns} data={courses} />
        </div>
     );
}
 
export default TeacherPage; 