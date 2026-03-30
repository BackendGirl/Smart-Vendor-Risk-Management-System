import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, permissions }) {
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            put(route('permissions.update', editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                }
            });
        } else {
            post(route('permissions.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const editPermission = (permission) => {
        setEditingId(permission.id);
        setData('name', permission.name);
    };

    const deletePermission = (id) => {
        if (confirm('Delete this permission?')) {
            router.delete(route('permissions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Permissions" />

            <div className="py-10 max-w-5xl mx-auto">

                {/* FORM */}
                <div className="bg-white p-6 rounded-2xl shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingId ? 'Edit Permission' : 'Add Permission'}
                    </h2>

                    <form onSubmit={submit} className="flex gap-3">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. edit users"
                            className="flex-1 border rounded-lg px-3 py-2"
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                            {editingId ? 'Update' : 'Add'}
                        </button>
                    </form>

                    {errors.name && (
                        <p className="text-red-500 mt-2 text-sm">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Permission List
                    </h2>

                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">#</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {permissions.map((p, index) => (
                                <tr key={p.id} className="border-t">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{p.name}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={() => editPermission(p)}
                                            className="bg-yellow-400 px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deletePermission(p.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}