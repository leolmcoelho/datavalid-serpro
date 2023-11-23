import json

# Seu JSON original
json_data = '''
{
  "cpf_disponivel": true,
  "nome": true,
  "nome_similaridade": 1,
  "data_nascimento": true,
  "situacao_cpf": true,
  "sexo": true,
  "nacionalidade": true,
  "cnh_disponivel": true,
  "cnh": {
    "nome": true,
    "nome_similaridade": 1,
    "numero_registro": true,
    "categoria": true,
    "codigo_situacao": true,
    "data_ultima_emissao": true,
    "data_primeira_habilitacao": true,
    "data_validade": true,
    "possui_impedimento": false,
    "observacoes": false,
    "observacoes_similaridade": 0
  },
  "filiacao": {
    "nome_mae": true,
    "nome_mae_similaridade": 1,
    "nome_pai": true,
    "nome_pai_similaridade": 1
  },
  "documento": {
    "tipo": true,
    "numero": true,
    "numero_similaridade": 1,
    "orgao_expedidor": true,
    "uf_expedidor": true
  },
  "endereco": {
    "logradouro": true,
    "logradouro_similaridade": 1,
    "numero": true,
    "numero_similaridade": 1,
    "bairro": true,
    "bairro_similaridade": 1,
    "cep": true,
    "municipio": true,
    "municipio_similaridade": 1,
    "uf": true
  },
  "biometria_face": {
    "disponivel": true,
    "probabilidade": "Baixa probabilidade",
    "similaridade": 0.3260811330029145
  }
}
'''
with open(r'D:\Desenvolvimento\OneDrive - Syara Education\desenvolvimento\datavalid\teste.json', 'r') as f:
        data = json.load(f)

import base64
from io import BytesIO
from PIL import Image

# Exemplo da string base64

# Decodificar a string base64
try:
    # Remova o prefixo "data:image/png;base64," antes de decodificar
    base64_data = data['answer']['biometria_face']['base64'].split(",")[1]
    # Decodificar a string base64
    image_bytes = base64.b64decode(base64_data)
    
    # Verificar a integridade da imagem usando PIL (Python Imaging Library)
    Image.open(BytesIO(image_bytes)).verify()
    
    print("A imagem base64 é válida.")
except Exception as e:
    print(f"Erro ao processar a imagem base64: {str(e)}")


