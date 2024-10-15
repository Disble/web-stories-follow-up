import "server-only";

import type { z } from "zod";

import { auth } from "@repo/auth-config/auth";
import {
  FetchError,
  SessionError,
  ValidationError,
} from "@repo/types/utils/errors";

import { env } from "@repo/env-config/env-global";
import type { FetchResponse } from "#abstract-factory/fetch-api.interface";

/**
 * Determines if the response is a JSON response.
 *
 * @param response - The Response object to check.
 * @returns A boolean indicating whether the response is JSON or not.
 */
function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ?? false;
}

export abstract class FetchApiMiddleware {
  protected abstract baseURL: string;

  private apiHeaders = {
    "Content-Type": "application/json",
  };

  /**
   * Makes a request to the specified URL with the provided config and returns the parsed response.
   * Throws an error if no session is found.
   * @param url - The URL to send the request to.
   * @param schema - The schema to parse the response with.
   * @param config - Optional additional configuration for the request.
   * @returns The parsed response.
   * @throws An error if no session is found.
   */
  protected async fetch<TValues>(
    url: string,
    schema: z.Schema<TValues>,
    config: RequestInit = {},
    options: {
      isPublic?: boolean;
    } = {}
  ): Promise<FetchResponse<TValues>> {
    let contextError: Record<string, unknown> | string = {};
    try {
      const session = await auth();
      if (!options.isPublic && !session) {
        throw new SessionError("No session found");
      }

      const response = await fetch(`${this.baseURL}${url}`, {
        ...config,
        headers: {
          ...(config.headers ?? this.apiHeaders),
        },
      });

      await FetchApiMiddleware.requestStatusValidations(response);

      // for 200 responses without body
      if (response.body == null) {
        return [null as TValues, null];
      }

      const data = isJsonResponse(response)
        ? await response.json()
        : await response.text();
      contextError = data;
      const schemaParsed = schema.safeParse(contextError);

      if (!schemaParsed.success) {
        throw new ValidationError(
          "Zod error",
          schemaParsed.error,
          contextError
        );
      }

      return [schemaParsed.data, null];
    } catch (error) {
      return FetchApiMiddleware.catchError<TValues>(
        error,
        url,
        config,
        contextError
      );
    }
  }

  private static async catchError<TValues>(
    error: unknown,
    url: string,
    config: RequestInit,
    responseError: Record<string, unknown> | string
  ): Promise<FetchResponse<TValues>> {
    console.error(
      "🔴",
      config.method,
      error instanceof FetchError ? error.status : "unknown",
      url
    );
    if (env.NODE_ENV === "development") {
      console.error(
        "🔴",
        "response:",
        error instanceof FetchError ? error.data : responseError
      );
      console.error(
        "🔴",
        "message:",
        error instanceof FetchError ? error.message : error
      );
    }

    return [null, error];
  }

  private static async requestStatusValidations(response: Response) {
    if (response.status > 400) {
      throw new FetchError(
        response.statusText,
        response.status,
        response,
        await response.text()
      );
    }
  }
}
