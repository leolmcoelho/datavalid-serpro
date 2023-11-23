import sys
import os
import base64, imghdr, json
from datetime import date

sys.path.append(os.getcwd())

from app.connection.handler import DataHandler
from app.connection.datavalid import DataValidAPI

data_R ={ 
    "gerais": {
        "cpf_disponivel": True,
        "nome": True,
        "nome_similaridade": 1,
        "data_nascimento": True,
        "situacao_cpf": True,
        "sexo": True,
        "nacionalidade": True,
        "cnh_disponivel": True,
    },

    "cnh": {
        "nome": True,
        "nome_similaridade": 1,
        "numero_registro": True,
        "categoria": True,
        "codigo_situacao": True,
        "data_ultima_emissao": True,
        "data_primeira_habilitacao": True,
        "data_validade": True,
        "possui_impedimento": False,
        "observacoes": False,
        "observacoes_similaridade": 0
    },
    "filiacao": {
        "nome_mae": True,
        "nome_mae_similaridade": 1,
        "nome_pai": True,
        "nome_pai_similaridade": 1
    },
    "documento": {
        "tipo": True,
        "numero": True,
        "numero_similaridade": 1,
        "orgao_expedidor": True,
        "uf_expedidor": True
    },
    "endereco": {
        "logradouro": True,
        "logradouro_similaridade": 1,
        "numero": True,
        "numero_similaridade": 1,
        "bairro": True,
        "bairro_similaridade": 1,
        "cep": True,
        "municipio": True,
        "municipio_similaridade": 1,
        "uf": True
    },
    "biometria_face": {
        "disponivel": True,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }

}


data_v = {
    "documento": "CNH",
    "cnh": {
        "numero_registro": True,
        "numero_registro_ocr": "987654321",
        "nome": True,
        "nome_similaridade": 1,
        "nome_ocr": "MANUELA ELISA DA MOTA",
        "identidade": True,
        "identidade_similaridade": 1,
        "identidade_ocr": "123456789 SSP SP",
        "data_nascimento": True,
        "data_nascimento_ocr": "1975-06-04",
        "data_primeira_habilitacao": True,
        "data_primeira_habilitacao_ocr": "2000-04-03",
        "data_ultima_emissao": True,
        "data_ultima_emissao_ocr": "2020-04-03",
        "data_validade": True,
        "data_validade_ocr": "2025-04-03",
        
    },
    "retrato": {
        "disponivel": True,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9956858549207501
    },
    "biometria_face": {
        "disponivel": True,
        "probabilidade": "Altíssima probabilidade",
        "similaridade": 0.9999
    }
}

class DataAPI(DataValidAPI, DataHandler):

    def __init__(self):
        super(DataHandler, self).__init__()
        super(DataValidAPI, self).__init__()

        pass

    def validacao_facial(self, data):
        contrato = data.get("contrato", '')
        imagens = data.get("images", [])
        #print(imagens)
        if imagens == []:
            return False
        data = self.get_client(contrato, True)
                  
        data = self.make_pf_facial(contrato, imagens[0]) 
        
        response = self.pf_facial(data)
        if response.get('status_code') == 200:
            response = self.reorganizar_json(response)
        response['contrato'] = contrato
        return response

        # self.pf_facial()

    
    def validacao_documento(self, data):
        _data = data 
        contrato = data.get("contrato", '')
        imagens = data.get("images", [])
        
        if imagens == []:
            return False
        
        data = self.get_client(contrato, True)

        #data = self.make_pf_facial(contrato, imagens[0]) 
        # with open('teste.json', 'w') as arquivo_json:
        #     json_data = json.dumps(_data, indent=4, default=serialize_date)
        #     arquivo_json.write(json_data)
        
        docs = {imagem["id"]: imagem for imagem in imagens}
        # print(docs['documento']['extension'])
        data = self.make_doc(contrato, docs) 
        
        response = self.pf_facial_cdv(data)

        keys = list(response.keys())
        cnh_data = response[keys[1]]
        retrato_data = cnh_data.pop("retrato", None)
        response["retrato"] = retrato_data
        response['contrato'] = contrato
        # print(data_v)

        return response


def serialize_date(obj):
    if isinstance(obj, date):
        return obj.isoformat()
if __name__ == "__main__":

    data = {
        "contrato": 20015011
    }
    with open(r'D:\Desenvolvimento\OneDrive - Syara Education\desenvolvimento\datavalid\teste.json', 'r') as f:
        data = json.load(f)

    d = DataAPI()
    r = d.validacao_documento(data)

    print(json.dumps(r, indent=4, default=serialize_date))
    with open('teste2.json', 'w') as arquivo_json:
            json_data = json.dumps(r, indent=4, default=serialize_date)
            arquivo_json.write(json_data)