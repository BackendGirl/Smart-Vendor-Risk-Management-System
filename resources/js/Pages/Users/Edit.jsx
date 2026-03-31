import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ user, roles, userRole }) {

    const { data, setData, put, processing } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: userRole || ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout header={<h2>Edit User</h2>}>
            <Head title="Edit User" />

            <div className="p-6 max-w-3xl mx-auto">
                <form onSubmit={submit} className="bg-white p-6 rounded shadow">

                    {/* Name */}
                    <div className="mb-4">
                        <label>Name</label>
                        <input
                            value={data.name}
                            className="w-full border p-2 rounded"
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label>Email</label>
                        <input
                            value={data.email}
                            className="w-full border p-2 rounded"
                            onChange={e => setData('email', e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded"
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                        <label>Role</label>
                        <select
                            value={data.role}
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
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}