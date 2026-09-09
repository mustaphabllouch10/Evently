export interface JwtPayload {
  userId: string;
  role : "organizer" | "admin"
}