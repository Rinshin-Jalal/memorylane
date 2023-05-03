import WithAuth from "@/components/withAuth";

import Head from "next/head";

const Contact = () => {
  return (
    <div className="container mx-auto ">
      <Head>
        <title>Memory Lane | Store Memories</title>
        <meta
          name="description"
          content="A social media app for storing memories"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black text-white py-16 px-8">
        <div>
          <h1 className="text-4xl font-bold mb-8">Memory lane</h1>

          <p className="text-lg mb-8">
            Welcome to My Memories App! This is a social media app for storing
            and playing with your memories. You can add your memories and view
            them anytime you want. The app also randomly quizzes you about your
            memories to keep them fresh in your mind.
          </p>

          <a
            href="/add-memory"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add a Memory
          </a>
        </div>

        <div>
          <h1 className="text-3xl font-bold mt-20 mb-4">Contact Us</h1>

          <div className="flex ">
            <form className="max-w-md w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full border-gray-300 border px-3 py-2 rounded-md"
                  id="name"
                  type="text"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full border-gray-300 border px-3 py-2 rounded-md"
                  id="email"
                  type="email"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full border-gray-300 border px-3 py-2 rounded-md"
                  id="message"
                  rows="5"
                  placeholder="Your message"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="mt-12 py-4 bg-gray-900 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2023 My Memories App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contact;
