import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface HomeProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

const Home = async ({ 
    searchParams 
  }: HomeProps) => {
  
    const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({
    userId,
    ...searchParams,
  });

  console.log("Fetched courses:", courses); 
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
      </div>
      {/* Add logic to render courses here */}
      <CoursesList items={courses} />
    </>
  );
};

export default Home;
