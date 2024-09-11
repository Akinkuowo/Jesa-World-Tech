"use client";

import { Button } from "@/components/ui/button";
import { Enroll } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  chapterId?: string;
  isLocked: boolean;
  enroll?: Enroll | null; // Made enroll optional to prevent undefined errors
}

export const CourseEnrollButton = ({
  courseId,
  chapterId,
  isLocked,
  enroll,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/enroll`);

      toast.success(response.data, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      if (chapterId) {
        router.refresh()
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the user is already enrolled in the course
  if (enroll && enroll.courseId === courseId) {
    return null;
  }else{
    
    return (
      <Button
        className="w-full md:w-auto bg-yellow-400"
        size="sm"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? "Enrolling..." : "Enroll Course"}
      </Button>
    );
  }

  
};
