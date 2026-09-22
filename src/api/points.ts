import authAxiosInstance from "./authAxiosInstance";
import type {
  PointsBalanceResponse,
  PointsTransactionResponse,
  PointsPackageResponse,
  PointsPurchaseResponse,
  PurchasePointsRequest,
} from "./types/points";

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
