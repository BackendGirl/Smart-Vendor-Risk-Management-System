import { Link } from '@inertiajs/react';

export default function Error403() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            <h1 className="text-6xl font-bold text-red-500 mb-4">
                403
            </h1>

            <p className="text-xl text-gray-700 mb-6">
                Access Denied 🚫
            </p>

            <p className="text-gray-500 mb-6 text-center">
                You do not have permission to access this page.
            </p>

            <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Go to Dashboard
            </Link>

        </div>
    );
}