import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Notification */}
                    {isNotif && (
                        <div
                            role="alert"
                            className="alert alert-success flex items-center space-x-2 p-4 rounded-lg shadow bg-green-100 text-green-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{props.flash.message}</span>
                        </div>
                    )}

                    {/* Add News Form */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Tambahkan Berita Baru</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Judul"
                                className="input input-bordered w-full"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <textarea
                                placeholder="Deskripsi"
                                className="textarea textarea-bordered w-full"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="input input-bordered w-full"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            />
                            <button
                                className="btn btn-primary w-full"
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>

                    {/* News List */}
                    <div className="bg-base-300 shadow-md rounded-lg p-6">
                        {props.myNews && props.myNews.length > 0 ? (
                            props.myNews.map((news, index) => (
                                <div
                                    key={index}
                                    className="card bg-white shadow-md rounded-lg overflow-hidden m-2"
                                >
                                    <div className="p-4">
                                        <h2 className="font-bold text-lg mb-2">
                                            {news.title}
                                        </h2>
                                        <p className="text-gray-700 text-sm mb-4">
                                            {news.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="badge badge-primary">
                                                {news.category}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {news.author}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <button className="btn btn-success btn-sm w-1/2 mr-2">
                                            <Link href={route('edit.news')} method="get" data={{id: news.id}}>
                                                Edit
                                            </Link>
                                            </button>
                                            <button className="btn btn-error btn-sm w-1/2 mr-2">
                                            <Link href={route('delete.news')} method="post" data={{id: news.id}}>
                                                Delete
                                            </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 className="text-gray-600 text-center col-span-full">
                                Anda belum memiliki berita
                            </h3>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
