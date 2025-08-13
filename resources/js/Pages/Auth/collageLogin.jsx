

import axiosInstance from '@/utils/axiosInstance';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CollageLogin() {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        axiosInstance.post('/admin', data)
  .then(res => {
    const user = res.data.detail;
    const roles = [user.role?.toLowerCase()]; // lowercase match

    toast.success('Login successful! Redirecting...');
    if (roles.includes('collegeadmin')) {
      router.visit('/admin/t');
    } else {
      toast.error('No valid role assigned');
    }
  })

            .catch(err => {
                if (err.response?.status === 422) {
                    setErrors(err.response.data.errors || {});
                    toast.error('Validation failed. Check inputs.');
                } else if (err.response?.status === 401) {
                    toast.error('Invalid email or password');
                } else {
                    toast.error('Something went wrong. Try again.');
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <form onSubmit={submit} className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4"> Login</h1>

            <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
                className="w-full border p-2 mb-2"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

            <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Password"
                className="w-full border p-2 mb-2"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
