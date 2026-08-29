import apiClient from './client';

export const challengeApi = {
    getByDate: (date) => apiClient.get(`/api/challenge/${date}`),
    updateChallenge: (date, challengeData) => apiClient.put(`/api/challenge/${date}`, challengeData)
};