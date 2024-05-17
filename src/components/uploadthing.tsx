import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

import type { FileUploadRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<FileUploadRouter>();
export const UploadDropzone = generateUploadDropzone<FileUploadRouter>();
export const { useUploadThing } = generateReactHelpers<FileUploadRouter>();
