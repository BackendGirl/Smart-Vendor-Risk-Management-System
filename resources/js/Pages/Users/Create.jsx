import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ roles }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout header={<h2>Create User</h2>}>
            <Head title="Create User" />

            <div className="p-6 max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white p-6 rounded shadow">

                    {/* Name */}
                    <div className="mb-4">
                        <label>Name</label>
                        <input
                            className="w-full border p-2 rounded"
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label>Email</label>
                        <input
                            className="w-full border p-2 rounded"
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded"
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>

                    {/* Role Dropdown */}
                    <div className="mb-4">
                        <label>Role</label>
                        <select
                            className="w-full border p-2 rounded"
                            onChange={e => setData('role', e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}