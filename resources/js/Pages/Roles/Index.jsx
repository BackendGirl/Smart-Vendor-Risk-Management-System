import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ roles }) {

    const deleteRole = (id) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('roles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles
                </h2>
            }
        >
            <Head title="Roles" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Top Button */}
                    <div className="mb-4 flex justify-end">
                        <Link
                            href={route('roles.create')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            + Create Role
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Role Name</th>
                                    <th className="p-3 text-left">Permissions</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {roles.length > 0 ? (
                                    roles.map((role, index) => (
                                        <tr key={role.id} className="border-t">
                                            <td className="p-3">{index + 1}</td>

                                            <td className="p-3 font-medium">
                                                {role.name}
                                            </td>

                                            {/* Permissions */}
                                            <td className="p-3">
                                                {role.permissions.length > 0 ? (
                                                    role.permissions.map((perm) => (
                                                        <span
                                                            key={perm.id}
                                                            className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                                                        >
                                                            {perm.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400">
                                                        No permissions
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="p-3 text-center space-x-2">
                                                <Link
                                                    href={route('roles.edit', role.id)}
                                                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => deleteRole(role.id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center text-gray-500">
                                            No roles found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}