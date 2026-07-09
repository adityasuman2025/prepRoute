import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import ButtonWithLoader from '@/components/common/ButtonWithLoader';
import LoaderOrError from '@/components/common/LoaderOrError';
import {
    FormInput,
    FormDropdown,
    FormMultiSelect,
    FormInputNumber,
    FormRadioGroup,
} from '@/components/common/FormFields';
import {
    type TestFormData,
    DEFAULT_FORM_VALUES,
    TestType,
    TestDifficulty,
    TEST_TYPE_META,
    VALIDATION_LIMITS,
    VALIDATION_MESSAGES,
} from '@/constants/createTest';
import { API_ENDPOINTS, API_METHODS } from '@/constants/api';
import { apiCall } from '@/utils/api';
import { resolveSubjectId, resolveTopicIds, resolveSubtopicIds } from '@/utils/createTest';

interface CreateTestFormProps {
    initialData: any;
    onSave: (data: TestFormData, shouldNavigate: boolean) => void;
    onCancel: () => void;
    isSaving: boolean;
}
function CreateTestForm({
    initialData,
    onSave,
    onCancel,
    isSaving,
}: CreateTestFormProps) {
    const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<TestFormData>({ defaultValues: DEFAULT_FORM_VALUES });

    const selectedSubject = watch('subject');
    const selectedTopics = watch('topics');
    const testType = watch('type');

    const { data: subjectsData, isLoading: isSubjectsLoading } = useQuery({ queryKey: ['subjects'], queryFn: async () => await apiCall(API_ENDPOINTS.SUBJECTS) });
    const subjects = useMemo(() => subjectsData?.data || [], [subjectsData]);
    const initialSubjectId = useMemo(() => initialData ? resolveSubjectId(subjects, initialData.subject) : '', [subjects, initialData]);
    const activeSubjectId = selectedSubject || initialSubjectId;

    const { data: topicsData, isLoading: isTopicsLoading } = useQuery({
        queryKey: ['topics', activeSubjectId],
        queryFn: async () => await apiCall(API_ENDPOINTS.TOPICS_BY_SUBJECT(activeSubjectId)),
        enabled: !isSubjectsLoading && !!activeSubjectId,
    });
    const topics = useMemo(() => topicsData?.data || [], [topicsData]);
    const initialTopicIds = useMemo(() => initialData ? resolveTopicIds(topics, initialData.topics || []) : [], [topics, initialData]);
    const activeTopicIds = selectedTopics.length > 0 ? selectedTopics : initialTopicIds;

    const { data: subtopicsData, isLoading: isSubtopicsLoading } = useQuery({
        queryKey: ['subtopics', activeTopicIds],
        queryFn: async () => await apiCall(API_ENDPOINTS.MULTI_TOPICS_SUB_TOPICS, {
            method: API_METHODS.POST,
            body: { topicIds: activeTopicIds },
        }),
        enabled: !isSubjectsLoading && activeTopicIds.length > 0,
    });
    const subtopics = useMemo(() => subtopicsData?.data || [], [subtopicsData]);

    const [isPrefilled, setIsPrefilled] = useState(false);

    const isQueriesLoaded = useMemo(() => {
        if (isSubjectsLoading) return false;
        if (initialData) {
            if (initialSubjectId && isTopicsLoading) return false;
            if (initialTopicIds.length > 0 && isSubtopicsLoading) return false;
        }
        return true;
    }, [initialData, isSubjectsLoading, initialSubjectId, isTopicsLoading, initialTopicIds, isSubtopicsLoading]);

    // Single prefill cycle to synchronize form state with loaded DB items
    useEffect(() => {
        if (!isQueriesLoaded || isPrefilled) return;

        if (initialData) {
            const subjectId = resolveSubjectId(subjects, initialData.subject);
            const topicIds = resolveTopicIds(topics, initialData.topics || []);
            const subtopicIds = resolveSubtopicIds(subtopics, initialData.sub_topics || []);

            reset({ ...DEFAULT_FORM_VALUES, ...initialData, subject: subjectId, topics: topicIds, sub_topics: subtopicIds, difficulty: initialData.difficulty || TestDifficulty.EASY, });
        } else {
            reset(DEFAULT_FORM_VALUES);
        }
        setIsPrefilled(true);
    }, [isQueriesLoaded, isPrefilled, initialData, subjects, topics, subtopics, reset]);

    const handleNext = useCallback((data: TestFormData) => {
        onSave(data, true);
    }, [onSave]);

    const handleSaveDraft = useCallback(() => {
        handleSubmit((data) => {
            onSave(data, false);
        })();
    }, [handleSubmit, onSave]);

    const testTypeLabel = TEST_TYPE_META[testType]?.label ?? TEST_TYPE_META[TestType.CHAPTERWISE].label;
    const isFormReady = !isSubjectsLoading && isPrefilled;

    return (
        <LoaderOrError isLoading={!isFormReady}>
            <div className="max-w-5xl mx-auto space-y-6 font-sans">
                <div className="text-base text-slate-500 font-normal">
                    {"Test Creation / Create Test / "} <span className="text-slate-500">{testTypeLabel}</span>
                </div>

                <div className="bg-white mt-10 space-y-8">
                    <div className="flex items-center gap-1 border border-slate-200/60 p-1 rounded-xl w-fit">
                        {(Object.entries(TEST_TYPE_META) as [TestType, { label: string }][]).map(([type, { label }]) => (
                            <ButtonWithLoader
                                key={type}
                                type="button"
                                onClick={() => setValue('type', type)}
                                className={`px-6 py-3 h-auto text-xs rounded-lg transition-all cursor-pointer ${testType === type
                                    ? 'bg-[#F8FAFF] text-brand-primary'
                                    : 'text-slate-400 hover:text-slate-600 border-transparent'
                                    }`}
                            >
                                {label}
                            </ButtonWithLoader>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-6">
                                <FormDropdown
                                    name="subject"
                                    control={control}
                                    label="Subject"
                                    options={subjects}
                                    onChange={() => {
                                        setValue('topics', []);
                                        setValue('sub_topics', []);
                                    }}
                                    loading={isSubjectsLoading}
                                    disabled={isSaving}
                                    rules={{ required: VALIDATION_MESSAGES.SUBJECT_REQUIRED }}
                                    error={errors.subject?.message}
                                />

                                <FormMultiSelect
                                    name="topics"
                                    control={control}
                                    label="Topic"
                                    options={topics}
                                    onChange={() => setValue('sub_topics', [])}
                                    disabled={!selectedSubject || isTopicsLoading || isSaving}
                                    rules={{
                                        required: VALIDATION_MESSAGES.TOPICS_REQUIRED,
                                        validate: (val: any) => !val || val.length > 0 || VALIDATION_MESSAGES.TOPICS_REQUIRED
                                    }}
                                    error={errors.topics?.message}
                                />

                                <FormInput
                                    name="total_time"
                                    control={control}
                                    label="Duration (Minutes)"
                                    type="number"
                                    placeholder="Enter the time"
                                    disabled={isSaving}
                                    rules={{
                                        required: VALIDATION_MESSAGES.TIME_REQUIRED,
                                        min: { value: VALIDATION_LIMITS.MIN_POSITIVE, message: VALIDATION_MESSAGES.TIME_POSITIVE }
                                    }}
                                    error={errors.total_time?.message}
                                />
                            </div>

                            <div className="space-y-6">
                                <FormInput name="name" control={control} label="Name of Test" placeholder="Enter name of Test" disabled={isSaving} error={errors.name?.message} rules={{ required: VALIDATION_MESSAGES.NAME_REQUIRED }} />
                                <FormMultiSelect name="sub_topics" control={control} label="Sub Topic" options={subtopics} disabled={!selectedTopics || selectedTopics.length === 0 || isSubtopicsLoading || isSaving} error={errors.sub_topics?.message} />

                                <FormRadioGroup
                                    name="difficulty"
                                    control={control}
                                    label="Test Difficulty Level"
                                    options={[
                                        { id: 'diff-easy', label: 'Easy', value: TestDifficulty.EASY },
                                        { id: 'diff-medium', label: 'Medium', value: TestDifficulty.MEDIUM },
                                        { id: 'diff-difficult', label: 'Difficult', value: TestDifficulty.DIFFICULT },
                                    ]}
                                    disabled={isSaving}
                                    error={errors.difficulty?.message}
                                />
                            </div>
                        </div>

                        {/* Marking Scheme Section */}
                        <div className="space-y-6 pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800">Marking Scheme:</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="grid grid-cols-3 gap-3">
                                    <FormInputNumber name="wrong_marks" control={control} label="Wrong Answer" labelSize="small" disabled={isSaving} error={errors.wrong_marks?.message} />
                                    <FormInputNumber name="unattempt_marks" control={control} label="Unattempted" labelSize="small" disabled={isSaving} error={errors.unattempt_marks?.message} />
                                    <FormInputNumber name="correct_marks" control={control} label="Correct Answer" labelSize="small" disabled={isSaving} error={errors.correct_marks?.message} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        name="total_questions"
                                        control={control}
                                        label="No of Questions"
                                        type="number"
                                        labelSize="small"
                                        placeholder="Ex: 10"
                                        disabled={isSaving}
                                        rules={{
                                            required: VALIDATION_MESSAGES.QUESTIONS_REQUIRED,
                                            min: { value: VALIDATION_LIMITS.MIN_POSITIVE, message: VALIDATION_MESSAGES.QUESTIONS_POSITIVE }
                                        }}
                                        error={errors.total_questions?.message}
                                    />
                                    <FormInput
                                        name="total_marks"
                                        control={control}
                                        label="Total Marks"
                                        type="number"
                                        labelSize="small"
                                        placeholder="Ex:250 Marks"
                                        disabled={isSaving}
                                        rules={{
                                            required: VALIDATION_MESSAGES.MARKS_REQUIRED,
                                            min: { value: VALIDATION_LIMITS.MIN_NON_NEGATIVE, message: VALIDATION_MESSAGES.MARKS_NON_NEGATIVE }
                                        }}
                                        error={errors.total_marks?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Buttons */}
                        <div className="flex justify-end gap-3 pt-6">
                            <ButtonWithLoader
                                type="button"
                                onClick={handleSaveDraft}
                                isLoading={isSaving}
                                disabled={isSaving}
                                className="cursor-pointer text-xs font-semibold px-6 h-10 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition"
                            >
                                Save as Draft
                            </ButtonWithLoader>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isSaving}
                                className="cursor-pointer text-xs font-semibold px-6 h-10 bg-slate-50 hover:bg-slate-100 text-brand-primary rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <ButtonWithLoader
                                type="submit"
                                isLoading={isSaving}
                                disabled={isSaving}
                                className="text-xs font-semibold px-8 h-10 bg-brand-purple hover:bg-brand-blue-hover text-white rounded-lg transition"
                            >
                                Next
                            </ButtonWithLoader>
                        </div>
                    </form>
                </div>
            </div>
        </LoaderOrError>
    );
}

export default React.memo(CreateTestForm);
