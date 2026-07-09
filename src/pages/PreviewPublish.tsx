import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function PreviewPublish() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePublish = () => {
        // API logic for publishing draft test goes here
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-lg space-y-6">
                    <div className="inline-flex p-3 bg-emerald-50 text-emerald-500 rounded-full font-bold text-2xl">
                        ✓
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-800">Test Published!</h2>
                        <p className="text-sm text-slate-500">
                            Your test is now live and available to the moderators/candidates.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                        className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-medium py-2.5 rounded-lg shadow-sm transition-all cursor-pointer text-sm"
                    >
                        Go back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(ROUTES.ADD_QUESTIONS(id || ''))}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-all cursor-pointer font-bold"
                    >
                        &larr;
                    </button>
                    <h1 className="text-lg font-bold text-slate-800">Preview Test</h1>
                </div>
                <button
                    onClick={handlePublish}
                    className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    Publish Test
                </button>
            </header>

            {/* Preview Content */}
            <main className="max-w-3xl mx-auto p-6 md:p-8 space-y-6">
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Test Preview Overview</h2>

                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-6 text-sm text-slate-600">
                        <div>
                            <p className="font-semibold text-slate-800">Test Name</p>
                            <p>Demo Test Name</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">Subject</p>
                            <p>English</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">Duration</p>
                            <p>60 minutes</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">Marking Scheme</p>
                            <p>+4 / -1 / 0</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800">Questions</h3>
                        <p className="text-slate-400 text-sm italic">
                            Example question styling. Publish details to submit.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
