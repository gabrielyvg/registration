export const userService = {
  async salvar(dados: any) {
      try {
          const response = await fetch(`http://localhost:3333/users`, {
              method: 'POST',
              body: JSON.stringify(dados),
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
          })

          if (!response.ok) {
              throw new Error('Erro ao salvar usuário!');
          }

          const responseBody = await response.json();
          return responseBody;
      } catch (error) {
          console.error('Erro ao salvar usuário:', error);
          throw error;
      }
  }
}