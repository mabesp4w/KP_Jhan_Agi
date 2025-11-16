import Alert from '@/Components/ui/Alert';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Head, Link, useForm } from '@inertiajs/react';
import AOS from 'aos';
import { Eye, EyeOff, Home, Lock, LogIn, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const getRouteUrl = (routeName, fallbackUrl) => {
        try {
            if (typeof route === 'function') {
                const url = route(routeName);
                if (url && url !== '#') {
                    return url;
                }
            }
            return fallbackUrl || '#';
        } catch (error) {
            return fallbackUrl || '#';
        }
    };

    return (
        <>
            <Head title="Login - SIG SMP YPK Jayapura" />

            <div className="flex min-h-screen">
                {/* Left Side - Info/Image Section */}
                <div className="hidden flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent p-12 text-primary-content lg:flex lg:w-1/2">
                    <div className="max-w-md" data-aos="fade-right">
                        <div className="mb-8 flex justify-center">
                            <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                                <img src="/images/logo.png" alt="Logo SIG SMP YPK Jayapura" className="h-24 w-24 object-contain" />
                            </div>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold">SIG SMP YPK Jayapura</h1>
                        <p className="mb-6 text-lg text-primary-content/90">
                            Sistem Informasi Geografis untuk Sekolah Menengah Pertama Yayasan Pendidikan Kristen di Jayapura
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Home className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Informasi Sekolah</p>
                                    <p className="text-sm text-primary-content/80">Akses data lengkap sekolah</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Akses Terkontrol</p>
                                    <p className="text-sm text-primary-content/80">Login untuk mengelola data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex w-full flex-col items-center justify-center bg-base-200 px-4 py-12 lg:w-1/2 lg:px-12">
                    <div className="w-full max-w-md" data-aos="fade-up">
                        <Card className="border-0 shadow-2xl">
                            <CardHeader className="flex flex-col items-center pb-4 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-primary/10 p-4">
                                        <img src="/images/logo.png" alt="Logo SIG SMP YPK Jayapura" className="h-16 w-16 object-contain" />
                                    </div>
                                </div>
                                <CardTitle className="mb-2 text-3xl font-bold text-primary">Selamat Datang</CardTitle>
                                <p className="text-sm text-base-content/70">Sistem Informasi Geografis SMP YPK Jayapura</p>
                            </CardHeader>
                            <CardBody className="pt-0">
                                {status && (
                                    <Alert variant="success" className="mb-4" data-aos="fade-down">
                                        {status}
                                    </Alert>
                                )}

                                <form onSubmit={submit} className="space-y-5">
                                    {/* Email Input */}
                                    <div className="form-control" data-aos="fade-up" data-aos-delay="100">
                                        <label className="label">
                                            <span className="label-text font-semibold">Email</span>
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <Mail className="z-30 h-5 w-5 text-base-content/40" />
                                            </div>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className={`input-bordered input w-full pl-12 ${errors.email ? 'input-error' : 'focus:input-primary'}`}
                                                placeholder="email@example.com"
                                                autoComplete="username"
                                                autoFocus
                                            />
                                        </div>
                                        {errors.email && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.email}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="form-control" data-aos="fade-up" data-aos-delay="200">
                                        <label className="label">
                                            <span className="label-text font-semibold">Password</span>
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <Lock className="z-30 h-5 w-5 text-base-content/40" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className={`input-bordered input w-full pr-12 pl-12 ${errors.password ? 'input-error' : 'focus:input-primary'}`}
                                                placeholder="Masukkan password"
                                                autoComplete="current-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/40 transition-colors hover:text-base-content/70"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.password}</span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between" data-aos="fade-up" data-aos-delay="300">
                                        <label className="label cursor-pointer justify-start gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="checkbox checkbox-sm checkbox-primary"
                                            />
                                            <span className="label-text text-sm">Ingat saya</span>
                                        </label>

                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="link text-sm link-primary hover:underline">
                                                Lupa password?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="form-control pt-2" data-aos="fade-up" data-aos-delay="400">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="h-12 w-full text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                                            loading={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="loading loading-sm loading-spinner"></span>
                                                    Memproses...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <LogIn className="h-5 w-5" />
                                                    Masuk
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* Footer */}
                                <div className="mt-6 border-t border-base-300 pt-6 text-center" data-aos="fade-up" data-aos-delay="500">
                                    <Link
                                        href={getRouteUrl('home', '/')}
                                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        <Home className="h-4 w-4" />
                                        Kembali ke Halaman Utama
                                    </Link>
                                    <p className="text-sm text-base-content/60">
                                        © {new Date().getFullYear()} SIG SMP YPK Jayapura. All rights reserved.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
