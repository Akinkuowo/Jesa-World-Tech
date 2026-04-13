// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
 
// const f = createUploadthing();
 
// const handleAuth = () => { 
//     const { userId } = auth();
//     if (!userId) throw new Error("Unauthorized users");
//     return { userId }
// }; 
 
// export const ourFileRouter = {
  
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//   .middleware(() => handleAuth())
//   .onUploadComplete(() => {}),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//   .middleware(() => handleAuth())
//   .onUploadComplete(() => {}),
//   chapterVideos: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
//   .middleware(() => handleAuth())
//   .onUploadComplete(() => {}),
// } satisfies FileRouter;
 
// export type OurFileRouter = typeof ourFileRouter;

import { getSession } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => { 
    const session = await getSession();
    const userId = session?.userId as string;
    if (!userId) throw new Error("Unauthorized users");
    return { userId }
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata }) => {
      console.log(`Upload complete for user: ${metadata.userId}`);
      // Add any other logic you want to execute after upload is complete
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata }) => {
      console.log(`Upload complete for user: ${metadata.userId}`);
    }),
  chapterVideos: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata }) => {
      console.log(`Upload complete for user: ${metadata.userId}`);
    }),
  userImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata }) => {
      console.log(`User image upload complete for user: ${metadata.userId}`);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
