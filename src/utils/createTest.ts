import { type SubjectItem, type TopicItem, type SubtopicItem } from '@/constants/createTest';

export function resolveSubjectId(subjects: SubjectItem[], testSubject: string): string {
    if (!testSubject) return '';
    const resolvedSubject = subjects.find(
        (s) => s.id === testSubject || s.name === testSubject
    );
    return resolvedSubject?.id || testSubject;
}

export function resolveTopicIds(topics: TopicItem[], originalTopics: string[]): string[] {
    if (!originalTopics || originalTopics.length === 0) return [];
    return originalTopics
        .map((tName) => topics.find((t) => t.id === tName || t.name === tName)?.id)
        .filter(Boolean) as string[];
}

export function resolveSubtopicIds(subtopics: SubtopicItem[], originalSubtopics: string[]): string[] {
    if (!originalSubtopics || originalSubtopics.length === 0) return [];
    return originalSubtopics
        .map((sName) => subtopics.find((s) => s.id === sName || s.name === sName)?.id)
        .filter(Boolean) as string[];
}
