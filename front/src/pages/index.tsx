import { userService } from "@/app/services/user-service";
import { useState } from "react";
import validator from 'validator';

export default function Home() {

  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName === 'password') {
      validatePassword(fieldValue);
    }

    if (fieldName === 'email') {
      validateEmail(fieldValue);
    }

    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setIsEmail(true);
    }
  }

  const validatePassword = (password: string) => {
    if (validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })) {
      setIsStrongPassword(true);
    }
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
      <div className="w-auto">
        <h1 className="mb-4 text font-bold text-lg">Sign Up</h1>

        <form onSubmit={onSubmit} className='flex flex-col'>
          <input className="border-2 border-black rounded-lg p-2 mb-2"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            value={dadosFormulario.name}
            onChange={handleInput}
            required
          />

          <input className={`border-2 rounded-lg p-2 mb-2 ${!isEmail ? 'focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-black'}`}
            placeholder="E-mail"
            type="email"
            name="email"
            id="email"
            value={dadosFormulario.email}
            onChange={handleInput}
            required
          />
          <small className="ml-2 text-red-700">{!isEmail ? 'Invalid E-mail' : ''}</small>

          <input className={`border-2 rounded-lg p-2 mb-2 ${!isStrongPassword ? 'focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-black'}`}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={dadosFormulario.password}
            onChange={handleInput}
            required
          />
          <small className="ml-2 text-red-700">{!isStrongPassword ? 'Invalid password' : ''}</small>
          
          <button className="bg-indigo-400 
                    text-white p-2
                    rounded-md shadow-sm 
                    shadow-indigo-600
                    font-semibold
                    hover:bg-slate-100 hover:text-black hover:border-solid hover:border-1 hover:border-indigo-400 hover:ease-in hover:duration-300"
            type="submit"
            disabled={!isEmail || !isStrongPassword}>
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
