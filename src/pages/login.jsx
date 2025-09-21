import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import { AcademicCapIcon } from '@heroicons/react/24/outline'; // Optional: for brand consistency

export default function Login() {
    const nav = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [err, setErr] = React.useState('');

    async function handle(e) {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            const token = res.data.token;
            localStorage.setItem('token', token);
            // After login, check onboarding
            nav('/check-onboarding');
        } catch (err) {
            setErr(err?.response?.data?.msg || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark p-4">
            <div className="w-full max-w-md bg-white dark:bg-secondary rounded-2xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center mb-4">
                        <AcademicCapIcon className="h-9 w-9 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-text-dark dark:text-text-primary">
                        Welcome Back
                    </h2>
                    <p className="text-text-dark/70 dark:text-text-secondary mt-1">
                        Sign in to continue to PathFinder
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handle} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-text-dark/80 dark:text-text-secondary mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-3 border border-black/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-primary transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-text-dark/80 dark:text-text-secondary mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-3 border border-black/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-primary transition"
                        />
                    </div>
                    <button className="w-full bg-gradient-to-r from-accent-orange to-accent-red hover:from-accent-orange/90 hover:to-accent-red/90 text-white p-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Login
                    </button>

                    {err && (
                        <div className="text-center bg-accent-red/10 text-accent-red p-3 rounded-lg font-medium">
                            {err}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}