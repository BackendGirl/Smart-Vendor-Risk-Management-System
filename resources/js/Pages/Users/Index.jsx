import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ users }) {

    const deleteUser = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Users</h2>}>
            <Head title="Users" />

            <div className="p-6">

                <div className="flex justify-end mb-4">
                    <Link
                        href={route('users.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Create User
                    </Link>
                </div>

                <div className="bg-white shadow rounded p-4 overflow-x-auto">
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">#</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Role</th>
                                <th className="p-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, i) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.email}</td>

                                        <td className="p-2">
                                            {user.roles.length > 0 ? (
                                                user.roles.map(role => (
                                                    <span
                                                        key={role.id}
                                                        className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded mr-1"
                                                    >
                                                        {role.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">No Role</span>
                                            )}
                                        </td>

                                        <td className="p-2 text-center space-x-2">
                                            <Link
                                                href={route('users.edit', user.id)}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}