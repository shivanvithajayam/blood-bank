import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    admin?: {
      username: string;
      role: string;
    } | null;
  }
  interface IronSession<T = IronSessionData> {
    admin?: {
      username: string;
      role: string;
    } | null;
  }
}

declare module "iron-session/next" {
  import type { NextApiHandler } from "next";
  export function withIronSessionApiRoute(handler: NextApiHandler, options?: any): any;
}
