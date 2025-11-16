import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Alert from '@/Components/ui/Alert';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {status && <Alert variant="success" className="mb-4">{status}</Alert>}

            <form onSubmit={submit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                        type="email"
                        value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                    placeholder="email@example.com"
                        autoComplete="username"
                                    autoFocus
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email}</span>
                                    </label>
                                )}
                </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                        type="password"
                        value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                    placeholder="Masukkan password"
                        autoComplete="current-password"
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password}</span>
                                    </label>
                                )}
                </div>

                            <div className="form-control mb-4">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                            checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="checkbox checkbox-primary"
                        />
                                    <span className="label-text">Remember me</span>
                    </label>
                </div>

                    {canResetPassword && (
                                <div className="mb-4 text-right">
                                    <Link href={route('password.request')} className="link link-primary text-sm">
                                        Lupa password?
                        </Link>
                                </div>
                    )}

                            <div className="form-control">
                                <Button type="submit" variant="primary" className="w-full" loading={processing}>
                                    Login
                                </Button>
                </div>
            </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

