import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ role, permissions, rolePermissions }) {

    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: rolePermissions || []
    });

    const handleCheckbox = (permission) => {
        if (data.permissions.includes(permission)) {
            setData('permissions', data.permissions.filter(p => p !== permission));
        } else {
            setData('permissions', [...data.permissions, permission]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Edit Role</h2>}
        >
            <Head title="Edit Role" />

            <div className="py-6 max-w-7xl mx-auto">

                <form onSubmit={submit} className="bg-white p-6 rounded shadow">

                    {/* Role Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Role Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>

                    {/* Permissions */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Permissions</label>

                        <div className="grid grid-cols-3 gap-2">
                            {permissions.map((perm) => (
                                <label key={perm.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={perm.name}
                                        checked={data.permissions.includes(perm.name)}
                                        onChange={() => handleCheckbox(perm.name)}
                                    />
                                    <span>{perm.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Update
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}