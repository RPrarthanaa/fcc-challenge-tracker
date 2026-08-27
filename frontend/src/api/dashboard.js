import apiClient from "./client";

export const dashboardApi = {
    getMainStats: () => apiClient.get("/dashboard/main-stats")
}