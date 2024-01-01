export interface JwtPayload {
  id: number;
  username: string;
}

export type AuthRequest = Request & { user: JwtPayload };
