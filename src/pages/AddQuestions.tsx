import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctOption: string;
}

export default function AddQuestions() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionText, setQuestionText] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('option1');

    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        if (!questionText || !option1 || !option2 || !option3 || !option4) {
            alert('Please fill out all options.');
            return;
        }

        const newQuestion: Question = {
            id: Date.now().toString(),
            text: questionText,
            options: [option1, option2, option3, option4],
            correctOption,
        };

        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('option1');
    };

    const handleDelete = (qid: string) => {
        setQuestions(questions.filter((q) => q.id !== qid));
    };

    const handleNext = () => {
        if (questions.length === 0) {
            alert('Please add at least one question.');
            return;
        }
        navigate(ROUTES.PREVIEW_PUBLISH(id || ''));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-all cursor-pointer font-bold"
                    >
                        &larr;
                    </button>
                    <h1 className="text-lg font-bold text-slate-800">Add Questions</h1>
                </div>
                <button
                    onClick={handleNext}
                    className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                    Preview & Publish
                </button>
            </header>

            {/* Content Split Layout */}
            <main className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Question Form */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6 self-start">
                    <h2 className="text-base font-semibold text-slate-800 border-b border-slate-50 pb-3">New Question</h2>

                    <form onSubmit={handleAddQuestion} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5 font-sans">Question Text</label>
                            <textarea
                                rows={3}
                                required
                                placeholder="Type question here"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-brand-blue"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-600">Options</label>
                            {[
                                { label: 'Option A', val: option1, set: setOption1, id: 'option1' },
                                { label: 'Option B', val: option2, set: setOption2, id: 'option2' },
                                { label: 'Option C', val: option3, set: setOption3, id: 'option3' },
                                { label: 'Option D', val: option4, set: setOption4, id: 'option4' },
                            ].map((opt) => (
                                <div key={opt.id} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="correct-option"
                                        checked={correctOption === opt.id}
                                        onChange={() => setCorrectOption(opt.id)}
                                        className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-slate-300"
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder={opt.label}
                                        value={opt.val}
                                        onChange={(e) => opt.set(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                        >
                            + Add Question
                        </button>
                    </form>
                </div>

                {/* Right Side: List of Added Questions */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
                    <h2 className="text-base font-semibold text-slate-800 border-b border-slate-50 pb-3 flex justify-between items-center">
                        <span>Added Questions</span>
                        <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-bold">
                            {questions.length} Total
                        </span>
                    </h2>

                    {questions.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-sm">
                            No questions added yet. Create one on the left.
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                            {questions.map((q, index) => (
                                <div key={q.id} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-3 relative group">
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="absolute right-4 top-4 px-2 py-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded text-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                    <p className="font-semibold text-sm text-slate-800 pr-8">
                                        Q{index + 1}. {q.text}
                                    </p>
                                    <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc">
                                        {q.options.map((opt, oIdx) => (
                                            <li
                                                key={oIdx}
                                                className={
                                                    q.correctOption === `option${oIdx + 1}`
                                                        ? 'text-brand-green font-bold list-none flex items-center gap-1.5 before:content-["✓"]'
                                                        : ''
                                                }
                                            >
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
