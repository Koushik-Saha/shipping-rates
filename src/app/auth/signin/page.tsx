'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            console.log('Attempting login with:', { email });
            const result = await signIn('credentials', {
                email,
                password,
                callbackUrl: '/rates',
                redirect: false,
            });

            console.log('Login result:', result);

            if (result?.error) {
                console.log('Login error:', result.error);
                setError('Invalid email or password');
            } else if (result?.ok) {
                console.log('Login successful!');
                setSuccess('🎉 Login successful! Welcome aboard, Captain!');
                
                // Set flag for welcome message
                localStorage.setItem('justLoggedIn', 'true');
                
                // Show success message for a moment, then redirect
                setTimeout(() => {
                    console.log('Redirecting to rates page...');
                    setSuccess('Redirecting to rates page...');
                    // Use router.push first, then fallback to window.location
                    router.push('/rates');
                }, 1000);
                
                // Fallback redirect
                setTimeout(() => {
                    if (window.location.pathname === '/auth/signin') {
                        console.log('Using fallback redirect');
                        window.location.href = '/rates';
                    }
                }, 2500);
            } else {
                console.log('Unexpected result:', result);
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login exception:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            console.log('Attempting Google login...');
            setSuccess('Redirecting to Google...');
            await signIn('google', { redirect: true, callbackUrl: '/rates' });
        } catch (err) {
            console.error('Google login error:', err);
            setError('Google login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Captain!</h2>
                        <p className="text-gray-600">Sign in to your account to continue</p>
                        
                        {/* Test Credentials */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                            <p className="font-semibold text-blue-800 mb-1">Test Credentials:</p>
                            <p className="text-blue-700">Email: test@example.com</p>
                            <p className="text-blue-700">Password: testpassword123</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Email Login Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 cursor-pointer mt-6"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-gray-500 text-sm">or continue with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full border border-gray-300 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-100 cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in with Google
                    </button>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
