import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourse } from "@/actions/get-courses";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface HomeProps {
  searchParams: Promise<{
    title?: string;
    categoryId?: string;
  }>;
}

const Home = async (props: HomeProps) => {
  const searchParams = await props.searchParams;

  const session = await getSession();
  const userId = session?.userId as string;

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



  return (
    <div className="flex flex-col h-full bg-slate-50/30">
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 pb-2">
        <Categories items={categories} />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm min-h-[60vh] p-6 lg:p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Explore Courses</h2>
            <CoursesList items={courses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
