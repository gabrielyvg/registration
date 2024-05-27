import { userService } from "@/app/services/user-service";
import { useState } from "react";

export default function Home() {

  const [dadosFormulario, setDadosFormulario] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const result = await userService.salvar({
        data: dadosFormulario,
      })

    } catch (error) {
      console.log(error);
    } finally {
      console.log('E-mail de confirmação enviado')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="mb-4 text font-bold text-lg">Sign Up</h1>

        <form onSubmit={onSubmit} className='flex flex-col items-center'>
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            value={dadosFormulario.name}
            onChange={handleInput}
          />
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="E-mail"
            type="email"
            name="email"
            id="email"
            value={dadosFormulario.email}
            onChange={handleInput}
          />
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={dadosFormulario.password}
            onChange={handleInput}
          />

          <button className="mt-4 hover:border-2 hover:border-black rounded-lg px-6 py-2 hover:bg-white bg-stone-400"
            type="submit">
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
