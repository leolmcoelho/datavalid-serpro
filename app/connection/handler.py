import os
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

        return codes[name]

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
        biometria_data = {
            "formato": formart,
            "base64": file
        }
        return biometria_data

    def cnh(self, data):
        data_cnh = {
            "categoria": data['categoria'],
            "observacoes": data['observacoes'],
            "numero_registro": data['registro'],
            "data_primeira_habilitacao": data['primeria_cnh'],
            "data_validade": data['validade'],
            "registro_nacional_estrangeiro": "",
            "data_ultima_emissao": data['emissão'],
            "codigo_situacao": data['cod_emissao'],
            "possui_impedimento": data['impedimento']
        }
        return data_cnh

    def make_pf_facial(self, contrato, data_files, data_cnh):
        file = data_files['file']
        formart = data_files['formart']

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
