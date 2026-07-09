import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@/constants/routes';
import { API_ENDPOINTS, API_METHODS } from '@/constants/api';
import { apiCall } from '@/utils/api';
import logo from '@/assets/logo.svg';
import illustration from '@/assets/login-illustration.svg';
import ButtonWithLoader from '@/components/common/ButtonWithLoader';
import Input from '@/components/common/Input';
import { STORAGE_KEYS } from '@/constants/storage';
import { setStorageItem } from '@/utils/storage';
import { useToast } from '@/context/ToastContext';

function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { userId: '', password: '' } });

    const loginMutation = useMutation({
        mutationFn: (credentials: { userId: string; password?: string }) => apiCall(API_ENDPOINTS.LOGIN, { method: API_METHODS.POST, body: credentials }),
        onSuccess: (result, variables) => {
            const isSuccessful = result.success === true || result.status === 'success';

            if (isSuccessful) {
                const data = result.data;
                // Store JWT token in localStorage
                setStorageItem(STORAGE_KEYS.TOKEN, data.token);
                setStorageItem(STORAGE_KEYS.USER, data.user || { userId: variables.userId });
                // Redirect to dashboard
                navigate(ROUTES.DASHBOARD);
            } else {
                toast.showError(result.message || 'Invalid User ID or password');
            }
        },
        onError: (err) => toast.showError(err.message || 'Something went wrong')
    });

    const onSubmit = useCallback((data: { userId: string; password?: string }) => {
        loginMutation.mutate(data);
    }, [loginMutation]);

    return (
        <main className="flex min-h-screen w-full bg-[#f8fafc]">
            <section className="hidden lg:flex w-1/2 items-center justify-center bg-[#f6f9ff] p-12">
                <div className="max-w-md text-center">
                    <img
                        src={illustration}
                        alt="Hourglass illustration working at laptop"
                        className="w-full h-80 max-w-sm mx-auto object-contain"
                    />
                </div>
            </section>

            <section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full h-full border-[0.5px] border-[#60A5FA] rounded-xl bg-white flex flex-col justify-center items-center">
                    <div className='w-120 flex flex-col gap-4'>
                        <img src={logo} alt="Preproute Logo" className="h-10 w-fit object-contain mb-3" />
                        <h1 className="text-2xl font-semibold text-brand-text mb-1">Login</h1>
                        <p className="text-xs text-slate-400 font-normal mb-3">Use your company provided Login credentials</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
                            <Input
                                label="User ID"
                                type="text"
                                placeholder="Enter User ID"
                                disabled={loginMutation.isPending}
                                error={errors.userId?.message}
                                {...register('userId', { required: 'User ID is required' })}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                disabled={loginMutation.isPending}
                                error={errors.password?.message}
                                {...register('password', { required: 'Password is required' })}
                            />

                            <div className="flex items-center justify-between py-1">
                                <a className="text-sm text-brand-blue font-regular hover:underline hover:text-brand-blue-hover" >
                                    Forgot password?
                                </a>
                            </div>

                            <ButtonWithLoader type="submit" isLoading={loginMutation.isPending} className="h-12 w-full" >
                                Login
                            </ButtonWithLoader>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default React.memo(Login);
