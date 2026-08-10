import { useSessionStore } from "@/src/app/stores/auth.store";
import { unauthorized } from "next/navigation";
import { getSession } from "../../utils/session";
import { Course } from "./types";

export const getCourses = async () => {
  const CLASSBON_URL = process.env.NEXT_PUBLIC_CLASSBON_URL;
  const session = await getSession();
  const response = await fetch(`${CLASSBON_URL}/identity/courses`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (response.status === 401) {
    unauthorized();
  }
  return await response.json();
};

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {courses.map((course: Course, i: number) => (
        <div
          key={"course-" + i}
          className="bg-white shadow-md rounded-lg p-4 m-2"
        >
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="text-gray-600">{course.description}</p>
        </div>
      ))}
    </div>
  );
}
