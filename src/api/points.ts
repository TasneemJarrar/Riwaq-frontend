import authAxiosInstance from "./authAxiosInstance";

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


export const pointsApi = {
  getBalance: async (): Promise<PointsBalanceResponse> => {
    const { data } = await authAxiosInstance.get<PointsBalanceResponse>(
      "/api/points/me"
    );
    return data;
  },

  getTransactions: async (): Promise<PointsTransactionResponse[]> => {
    const { data } = await authAxiosInstance.get<PointsTransactionResponse[]>(
      "/api/points/me/transactions"
    );
    return data;
  },

  getPackages: async (): Promise<PointsPackageResponse[]> => {
    const { data } = await authAxiosInstance.get<PointsPackageResponse[]>(
      "/api/points/packages"
    );
    return data;
  },

  getPurchases: async (): Promise<PointsPurchaseResponse[]> => {
    const { data } = await authAxiosInstance.get<PointsPurchaseResponse[]>(
      "/api/points/me/purchases"
    );
    return data;
  },

  purchasePackage: async (
    payload: PurchasePointsRequest
  ): Promise<PointsPurchaseResponse> => {
    const { data } = await authAxiosInstance.post<PointsPurchaseResponse>(
      "/api/points/purchases",
      payload
    );
    return data;
  },
};
