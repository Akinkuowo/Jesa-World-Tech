import { redirect } from "next/navigation";

const DashboardCourseIdRedirectPage = async (
  props: {
    params: Promise<{ courseId: string }>;
  }
) => {
  const params = await props.params;
  
  // Gracefully redirect any dashboard-prefixed course links to the correct public course route
  return redirect(`/courses/${params.courseId}`);
};

export default DashboardCourseIdRedirectPage;
