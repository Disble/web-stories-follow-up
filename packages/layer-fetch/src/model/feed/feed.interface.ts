import { z } from "zod";

export const feedPublishPostBodySchema = z.object({
  message: z.string(),
  link: z.string(),
  published: z.boolean(),
  scheduled_publish_time: z.string(),
});

export type FeedPublishPostBody = z.infer<typeof feedPublishPostBodySchema>;

export const feedPublishPostResponseSchema = z.object({
  id: z.string(),
});

export type FeedPublishPostResponse = z.infer<
  typeof feedPublishPostResponseSchema
>;
