import { z } from "zod";

export const getPageAccessTokenResponseSchema = z.object({
  data: z.array(
    z.object({
      access_token: z.string(),
    })
  ),
});

export type GetPageAccessTokenResponse = z.infer<
  typeof getPageAccessTokenResponseSchema
>;
