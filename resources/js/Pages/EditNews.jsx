import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
      const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [category, setCategory] = useState("");
    
        const handleSubmit = () => {
            const data = {
                id:props.myNews.id,
                title,
                description,
                category,
            };
             Inertia.post("/news/update", data);
            setTitle("");
            setDescription("");
            setCategory("");
        };
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="p-4 text-2xl">EDIT BERITA</div>
            <div className="space-y-4 mt-4">
                <input
                    type="text"
                    placeholder="Judul"
                    className="input input-bordered w-full"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={props.myNews.title}
                />
                <textarea
                    placeholder="Deskripsi"
                    className="textarea textarea-bordered w-full"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={props.myNews.description}
                ></textarea>
                <input
                    type="text"
                    placeholder="Kategori"
                    className="input input-bordered w-full"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={props.myNews.category}
                />
                <button
                    className="btn btn-primary w-full"
                    onClick={handleSubmit}
                >
                    UPDATE
                </button>
            </div>
        </div>
    );
}
