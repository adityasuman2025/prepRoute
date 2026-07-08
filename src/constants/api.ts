export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SUBJECTS: `${API_BASE_URL}/subjects`,
    TOPICS_BY_SUBJECT: (subjectId: string) => `${API_BASE_URL}/topics/subject/${subjectId}`,
    SUBTOPICS_BY_TOPIC: (topicId: string) => `${API_BASE_URL}/sub-topics/topic/${topicId}`,
    TESTS: `${API_BASE_URL}/tests`,
    TEST_BY_ID: (id: string) => `${API_BASE_URL}/tests/${id}`,
    BULK_CREATE_QUESTIONS: `${API_BASE_URL}/questions/bulk`,
    PUBLISH_TEST: (id: string) => `${API_BASE_URL}/tests/${id}`,
    MULTI_TOPICS_SUB_TOPICS: `${API_BASE_URL}/sub-topics/multi-topics`,
    FETCH_BULK_QUESTIONS: `${API_BASE_URL}/questions/fetchBulk`,
};

export const API_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: "PATCH",
};