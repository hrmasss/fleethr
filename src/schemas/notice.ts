import { z } from "zod";

// Regular expression pattern for valid URL characters and Bangla characters
const validUrlCharRegex = /^[\u0980-\u09FFa-zA-Z0-9-_~!$&'()*+,;=:@]+$/;
export const validUrlString = z
  .string()
  .trim()
  .refine((val) => validUrlCharRegex.test(val), {
    message: "Invalid tag",
  });

// Notice model fields
const id = z.string();
const title = z.string().min(1, { message: "Required" });
const description = z.string().min(1, { message: "Required" });
const tags = z
  .array(validUrlString)
  .transform((tags) => [...new Set(tags)])
  .default([]);
const isPublic = z.boolean().default(false);

// Notice schemas
export const CreateNotice = z.object({ title, description, tags, isPublic });
export const GetNotice = z.object({ id });
export const GetPublicNotice = z.object({ orgId: id, noticeId: id });
export const GetAllPublicNotices = z.object({ orgId: id });
export const GetNoticeByTags = z.object({ tags });
export const UpdateNotice = CreateNotice.merge(GetNotice);

// Notice schema types
export type CreateNotice = z.infer<typeof CreateNotice>;
export type GetNotice = z.infer<typeof GetNotice>;
export type GetPublicNotice = z.infer<typeof GetPublicNotice>;
export type GetAllPublicNotices = z.infer<typeof GetAllPublicNotices>;
export type GetNoticeByTags = z.infer<typeof GetNoticeByTags>;
export type UpdateNotice = z.infer<typeof UpdateNotice>;
