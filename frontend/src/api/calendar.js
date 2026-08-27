import apiClient from './client';

export const calendarApi = {
    getAll: () => apiClient.get('/calendar/all'),
    getByMonth: (year, month) => apiClient.get(`/calendar/${year}/${month}`),
    addChallenge: (date, challengeData) => apiClient.post(`/calendar/${date}`, challengeData)
};