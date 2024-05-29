import { userService } from "@/app/services/user-service";
import { useState } from "react";
import validator from 'validator';

export default function Home() {

  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [passwordPoints, setPasswordPoints] = useState(0);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
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
      validatePasswordPoints(fieldValue);
      validatePasswordStrength(fieldValue);
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

  const validatePasswordPoints = (password: string) => {
    setPasswordPoints(validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: true,
      pointsPerUnique: 0,
      pointsPerRepeat: 0,
      pointsForContainingLower: 30,
      pointsForContainingUpper: 50,
      pointsForContainingNumber: 20,
      pointsForContainingSymbol: 0
    }));
  }

  const validatePasswordStrength = (password: string) => {
    setHasLowerCase(validator.isStrongPassword(password, {
      minLength: 0,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    }));

    setHasUpperCase(validator.isStrongPassword(password, {
      minLength: 0,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    }));

    setHasNumbers(validator.isStrongPassword(password, {
      minLength: 0,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    }));

    setHasMinLength(validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    }));

    if (hasLowerCase && hasUpperCase && hasNumbers && hasMinLength) {
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

          <input className={`border-2 rounded-lg p-2 mb-2 
                            ${!isStrongPassword ? 'focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'border-black'}
                          `}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={dadosFormulario.password}
            onChange={handleInput}
            required
          />
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-400">
            <div className="bg-blue-600 h-2.5 rounded-full w-7" ></div>
          </div>
          <div className="flex flex-col  my-2 ">
            <ul className="border-2 border-black rounded-md p-2">
            <li>
                <small className={`${!hasMinLength ? 'text-red-700' : 'text-green-700'}`}>Precisa ter no minímo 6 caracteres</small>
              </li>
              <li>
                <small className={`${!hasNumbers ? 'text-red-700' : 'text-green-700'}`}>Precisa ter um número</small>
              </li>
              <li>
                <small className={`${!hasUpperCase ? 'text-red-700' : 'text-green-700'}`}>Precisa ter uma letra maiúscula</small>
              </li>
              <li>
                <small className={`${!hasLowerCase ? 'text-red-700' : 'text-green-700'}`}>Precisa ter uma letra minuscula</small>
              </li>
            </ul>
          </div>
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
