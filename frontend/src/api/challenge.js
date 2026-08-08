import apiClient from './client';

export const challengeApi = {
    getByDate: (date) => apiClient.get(`/challenge/${date}`),
    addChallenge: (date, challengeData) => apiClient.post(`/challenge/${date}`, challengeData),
    updateChallenge: (date, challengeData) => apiClient.put(`/challenge/${date}`, challengeData)
};