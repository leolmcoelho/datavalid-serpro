# Sistema de Consultas Serpro Datavalid

## Descrição
Este é um front-end que realiza consultas à API do Datavalid Serpro, integrado ao banco de dados existente na empresa.

### Pré-requisitos
- Python 3.10 instalado
- Pip instalado
- Git instalado (se estiver clonando o repositório)

### Configuração do Ambiente
1. **Clone o repositório:**
    ```bash
    https://github.com/leolmcoelho/datavalid-serpro.git
    cd datavalid-serpro
    ```

2. **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Execute o aplicativo:**
    ```bash
    python run.py
    ```
   O aplicativo estará acessível em [http://localhost:5000](http://localhost:5000).

### Configuração Adicional
Para configurar o ambiente, siga estas etapas:

1. Na pasta `config`, crie um arquivo chamado `.env` com os seguintes parâmetros:

    ```env
    API_KEY= 
    DATABASE = 
    USER = 
    PASSWORD = 
    HOST = 
    ```
