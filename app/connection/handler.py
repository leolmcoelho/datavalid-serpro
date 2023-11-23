import os, json
import sys

sys.path.append(os.getcwd())

from typing import List
from sqlalchemy.orm import relationship, Session
from app.connection. interface import Cota, Cliente, Cidade, ResultadoInterface
from sqlalchemy import create_engine
from dotenv import dotenv_values
from datetime import date



class DataHandler:

    def __init__(self, user=None, password=None, host=None, database=None) -> None:
        if user is None and password is None and host is None and database is None:
            self._load_config()
        else:
            self.USER = user
            self.PASSWORD = password
            self.HOST = host
            self.DATABASE = database

        self._create_engine()
        self._create_session()

    def _create_engine(self):
        self.engine = create_engine(
            f'mysql://{self.USER}:{self.PASSWORD}@{self.HOST}/{self.DATABASE}', echo=False)

    def _create_session(self):
        self.session = Session(self.engine)

    def _load_config(self):
        config = dotenv_values(f'{os.getcwd()}/config/.env')
        for key, value in config.items():
            key = key.upper()
            setattr(self, key, value)
        self.API_KEY = config.get('API_KEY')

    def _client_dict(self, row: ResultadoInterface):
        resultado_dict = {
            'numero_contrato': row.numero_contrato,
            'CGC_CPF_CLIENTE': row.CGC_CPF_CLIENTE,
            'NOME': row.NOME,
            'sexo': row.sexo,
            'data_nascimento': row.data_nascimento,
            'CODIGO_TIPO_DOC_IDENT': row.CODIGO_TIPO_DOC_IDENT,
            'NACIONALIDADE': row.NACIONALIDADE,
            'nome_pai': row.nome_pai,
            'NOME_MAE': row.NOME_MAE,
            'DOCUMENTO': row.DOCUMENTO,
            'ORGAO_EMISSOR': row.ORGAO_EMISSOR,
            'UF_DOC_CLIENTE': row.UF_DOC_CLIENTE,
            'ENDERECO': row.ENDERECO,
            'bairro': row.bairro,
            'CEP': row.CEP,
            'cidade_nome': row.cidade,
            'cidade_estado': row.UF
        }

        return resultado_dict

    def nacionalidade_code(self, name):
        name = name.lower()
        codes = {
            'brasileira': 1,
            'brasileiro naturalizado': 2,
            'estrangeiro': 3,
            'brasileiro nascido no exterior': 4
        }

        return str(codes[name])

    def get_client(self, contrato, _dict=False) -> ResultadoInterface:
        resultado = (
            self.session.query(Cota.numero_contrato,
                               Cliente.CGC_CPF_CLIENTE,
                               Cliente.NOME,
                               Cliente.sexo,
                               Cliente.data_nascimento,
                               Cliente.CODIGO_TIPO_DOC_IDENT,
                               Cliente.NACIONALIDADE,
                               Cliente.nome_pai,
                               Cliente.NOME_MAE,
                               Cliente.DOCUMENTO,
                               Cliente.ORGAO_EMISSOR,
                               Cliente.UF_DOC_CLIENTE,
                               Cliente.ENDERECO,
                               Cliente.bairro,
                               Cliente.CEP,
                               Cidade.NOME.label('cidade'),
                               Cidade.ESTADO.label('UF')
                               )
            .join(Cliente,
                  Cliente.CGC_CPF_CLIENTE == Cota.CGC_CPF_CLIENTE)
            .join(Cidade,
                  Cidade.CODIGO_CIDADE == Cliente.CODIGO_CIDADE)
            .filter(Cota.numero_contrato == contrato)
            .first())
        
        
        if resultado is None:
            return False
        
        
        if _dict:
            resultado = self._client_dict(resultado)


        return resultado

    def cpf(self, contrato):
        client = self.get_client(contrato)
        data = {
            "key": {
                "cpf": client.CGC_CPF_CLIENTE
            }
        }

        return data

    def biometria(self, file, formart):
        base64_data = file.split(",")[1]
        biometria_data = {
            "formato": formart,
            "base64": base64_data
        }
        return biometria_data

    def cnh(self, data:dict = {}):
        data_cnh = {
            "categoria": data.get('categoria', ''),
            "observacoes": data.get('observacoes', ''),
            "numero_registro": data.get('registro', ''),
            "data_primeira_habilitacao": data.get('primeria_cnh', ''),
            "data_validade": data.get('validade', ''),
            "registro_nacional_estrangeiro": "",
            "data_ultima_emissao": data.get('emissão', ''),
            "codigo_situacao": data.get('cod_emissao', ''),
            "possui_impedimento": data.get('impedimento', '')
        }
        return data_cnh

    def make_pf_facial(self, contrato, data_files, data_cnh = {}):
        file = data_files['src']
        formart = data_files['extension']

        client = self.get_client(contrato)
        data = self.cpf(contrato)

        data["answer"] = {
            "nome": client.NOME,
            "sexo": client.sexo,
            "nacionalidade": self.nacionalidade_code(client.NACIONALIDADE),
            "data_nascimento": client.data_nascimento,
            "situacao_cpf": "regular",
            "filiacao": {
                "nome_mae": client.NOME_MAE,
                "nome_pai": client.nome_pai
            },
            "documento": {
                "tipo": client.CODIGO_TIPO_DOC_IDENT,
                "numero": client.DOCUMENTO,
                "orgao_expedidor": client.ORGAO_EMISSOR,
                "uf_expedidor": client.UF_DOC_CLIENTE
            },
            "endereco": {
                "logradouro": client.ENDERECO,
                "numero": "",  # Adicione o campo correspondente ao número do endereço
                "complemento": "",  # Adicione o campo correspondente ao complemento do endereço
                "bairro": client.bairro,
                "cep": client.CEP,
                "municipio": client.cidade,  # Adicione o campo correspondente ao município
                "uf": client.UF
            },
        }
        
        data["answer"]['cnh'] = self.cnh(data_cnh)

        data["answer"]['biometria_face'] = self.biometria(file, formart)

        return data


    def make_doc(self, contrato, docs):
        client = self.get_client(contrato)
        data = self.cpf(contrato)

        key = "answer"
        data[key] = {}
        items = ['documento', 'documento_verso', 'biometria_face']
        for item in items:
            _item = docs[item]
            data[key][item] = self.biometria(_item['src'], _item['extension'])

        return data
    

    def reorganizar_json(self, json_data):
        # Carregar o JSON
        data = json_data
        if type(json_data) != dict:
            data = json.loads(json_data)

        # Criar um novo objeto "gerais" para armazenar elementos soltos
        gerais = {}

        # Iterar sobre os elementos e movê-los para "gerais"
        keys_to_remove = []
        for key, value in data.items():
            if not isinstance(value, dict):
                gerais[key] = value
                keys_to_remove.append(key)

        # Remover os elementos movidos para "gerais" do objeto original
        for key in keys_to_remove:
            data.pop(key)

        # Adicionar "gerais" ao início do objeto original
        data = {"gerais": gerais, **data}

        # Converter de volta para JSON
        # result_json = json.dumps(data, indent=2)
        return data




def encode_date(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    return None


if __name__ == '__main__':
    d = DataHandler()
    r = d.get_client('20015011')
    tipo_documento = 'Carteira de Identidade'

    cnh = {
        'categoria': '',
        'observacoes': '',
        'registro': '',
        'primeria_cnh': '',
        'validade': '',
        'emissão': '',
        'cod_emissao': '',
        'impedimento': '',
    }
    codigo = d.make_pf_facial('20015011', {'file': '', 'formart': ''}, cnh)

    json_data = json.dumps(codigo, indent=4, default=encode_date)

    print(json_data)
    # r = d.nacionalidade_code('Brasileiro naturalizado')
    # print(r)

    # Exiba o resultado
    # print(r.CEP)
    # print(r.numero_contrato)
    # print(r.CGC_CPF_CLIENTE)
    # print(r.NOME)
    # print(r.sexo)
    # print(r.data_nascimento)
    # print(r.CODIGO_TIPO_DOC_IDENT)
    # print(r.NACIONALIDADE)
    # print(r.nome_pai)
    # print(r.NOME_MAE)
    # print(r.DOCUMENTO)
    # print(r.ORGAO_EMISSOR)
    # print(r.UF_DOC_CLIENTE)
    # print(r.ENDERECO)
    # print(r.bairro)
    # print(r.CEP)
    # print(r.cidade)
    # print(r.cidade_estado)
