/** Backend Points API types (from OpenAPI) */

export interface PointsBalanceResponse {
  points: number;
}

export interface PointsTransactionResponse {
  id: string;
  amount: number;
  transactionType: string | null;
  relatedUserId: string | null;
  mentoringSessionId: string | null;
  reason: string | null;
  createdAt: string;
}

export interface PointsPackageResponse {
  id: string | null;
  points: number;
  price: number;
  currency: string | null;
}

export interface PointsPurchaseResponse {
  id: string;
  packageId: string | null;
  points: number;
  price: number;
  currency: string | null;
  paymentMethod: string | null;
  status: string | null;
  createdAt: string;
  balance: number;
}

export interface PurchasePointsRequest {
  packageId: string | null;
  idempotencyKey: string | null;
}

/** UI-friendly activity item derived from transactions */
export type ActivityType = "earned" | "spent" | "bonus";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  meta: string;
  amount: number;
  date: string;
  createdAt: string;
}
