import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "@/server/auth";

const f = createUploadthing();

export const fileUploadRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerAuthSession();

      if (!session) throw new UploadThingError("Unauthorized");

      return { uploadedBy: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user: ", metadata.uploadedBy);
      console.log("File URL: ", file.url);

      // ? Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.uploadedBy };
    }),
} satisfies FileRouter;

export type FileUploadRouter = typeof fileUploadRouter;
