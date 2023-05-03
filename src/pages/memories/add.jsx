import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import withAuth from "@/components/withAuth";

export default function AddMemoryPage() {
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("body", body);
      formData.append("date", date);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post("/api/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <Head>
        <title>Add Memory</title>
        <meta name="description" content="Add Memory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8 text-white">
        <h1 className="text-3xl font-bold mb-20">Add Memory</h1>

        <form onSubmit={handleSubmit} className="max-w-lg mt-10">
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Body
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 rounded-md bg-gray-900"
              rows="12"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block font-medium mb-2 outline-none"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-3 py-2 rounded-md bg-gray-900 outline-none"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-2">
              Image
            </label>
            <input
              id="image"
              type="file"
              className="w-full px-3 py-2 rounded-md bg-gray-900 outline-none"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Memory
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
