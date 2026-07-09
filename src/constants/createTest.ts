export interface SubjectItem {
    id: string;
    name: string;
}

export interface TopicItem {
    id: string;
    name: string;
    subject_id: string;
}

export interface SubtopicItem {
    id: string;
    name: string;
    topic_id: string;
}

export const TestType = {
    CHAPTERWISE: 'chapterwise',
    PYQ: 'pyq',
    MOCK: 'mock',
} as const;
export type TestType = typeof TestType[keyof typeof TestType];

export const TestDifficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    DIFFICULT: 'difficult',
} as const;
export type TestDifficulty = typeof TestDifficulty[keyof typeof TestDifficulty];

export const TEST_TYPE_META: Record<TestType, { label: string }> = {
    [TestType.CHAPTERWISE]: { label: 'Chapterwise' },
    [TestType.PYQ]: { label: 'PYQ' },
    [TestType.MOCK]: { label: 'Mock Test' },
} as const;

export interface TestFormData {
    name: string;
    type: TestType;
    subject: string; // subject ID
    topics: string[]; // topic IDs
    sub_topics: string[]; // sub-topic IDs
    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;
    difficulty: TestDifficulty;
    total_time: number | '';
    total_marks: number | '';
    total_questions: number | '';
}

export const DEFAULT_MARKS = {
    CORRECT: 5,
    WRONG: -1,
    UNATTEMPTED: 0,
} as const;

export const TEST_STATUS = {
    DRAFT: 'draft',
    LIVE: 'live',
} as const;
export type TestStatus = typeof TEST_STATUS[keyof typeof TEST_STATUS];

export const DEFAULT_FORM_VALUES: TestFormData = {
    name: '',
    type: TestType.CHAPTERWISE,
    subject: '',
    topics: [],
    sub_topics: [],
    correct_marks: DEFAULT_MARKS.CORRECT,
    wrong_marks: DEFAULT_MARKS.WRONG,
    unattempt_marks: DEFAULT_MARKS.UNATTEMPTED,
    difficulty: TestDifficulty.EASY,
    total_time: '',
    total_marks: '',
    total_questions: '',
};

export const VALIDATION_LIMITS = {
    MIN_POSITIVE: 1,
    MIN_NON_NEGATIVE: 0,
} as const;

export const VALIDATION_MESSAGES = {
    NAME_REQUIRED: 'Test name is required',
    SUBJECT_REQUIRED: 'Subject is required',
    TOPICS_REQUIRED: 'Topic is required',
    TIME_REQUIRED: 'Total time is required',
    TIME_POSITIVE: 'Total time must be a positive integer',
    QUESTIONS_REQUIRED: 'Total questions is required',
    QUESTIONS_POSITIVE: 'Total questions must be a positive integer',
    MARKS_REQUIRED: 'Total marks is required',
    MARKS_NON_NEGATIVE: 'Total marks must be a non-negative integer',
} as const;

