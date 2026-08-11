import apiClient from './client';

export const challengeApi = {
    getByDate: (date) => apiClient.get(`/challenge/${date}`),
    updateChallenge: (date, challengeData) => apiClient.put(`/challenge/${date}`, challengeData)
};