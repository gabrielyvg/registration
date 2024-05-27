import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="mb-4 text font-bold text-lg">Sign Up</h1>

        <section className="flex flex-col">
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
          />
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="E-mail"
            type="email"
            name="email"
            id="email"
          />
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />

          <button className="mt-4 hover:border-2 hover:border-black rounded-lg p-2 hover:bg-white bg-stone-400"
            type="submit">
            Sign up
          </button>
        </section>
      </div>
    </main>
  );
}
