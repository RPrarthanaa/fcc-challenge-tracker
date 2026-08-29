import apiClient from "./client";

export const dashboardApi = {
    getMainStats: () => apiClient.get("/api/dashboard/main-stats")
}