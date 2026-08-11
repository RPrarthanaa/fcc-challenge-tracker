import apiClient from './client';

export const calendarApi = {
    getAll: () => apiClient.get('/calendar/all'),
    getByMonth: (month) => apiClient.get(`/calendar/${month}`),
    addChallenge: (date, challengeData) => apiClient.post(`/calendar/${date}`, challengeData)
};