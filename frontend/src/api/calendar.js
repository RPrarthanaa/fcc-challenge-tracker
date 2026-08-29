import apiClient from './client';

export const calendarApi = {
    getAll: () => apiClient.get('/api/calendar/all'),
    getByMonth: (year, month) => apiClient.get(`/api/calendar/${year}/${month}`),
    addChallenge: (date, challengeData) => apiClient.post(`/api/calendar/${date}`, challengeData)
};