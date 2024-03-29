import React from "react";

export default function App() {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Hello, Tailwind!</h1>
      </header>
      <main className="p-4">
        <p className="text-lg">
          This is a simple example of using Tailwind CSS with React.
        </p>
        <p className="text-lg">
          You can find the source code for this example on{" "}
          <a className="text-blue-500 hover:underline" href=""></a>
        </p>
      </main>
    </div>
  );
}
