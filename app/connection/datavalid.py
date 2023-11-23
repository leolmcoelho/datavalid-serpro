import os
import json
import requests
from base64 import b64encode
from dotenv import dotenv_values
from datetime import date

class DataValidAPI:

    def __init__(self):
        self.BASE_URL = 'https://gateway.apiserpro.serpro.gov.br/datavalid/v3'
        self.BASE_URL = 'https://gateway.apiserpro.serpro.gov.br/datavalid-demonstracao/v3'
        self._load_config()
        #
        self.get_token()
        pass

    def _load_config(self):
        config = dotenv_values(f'{os.getcwd()}/config/.env')
        for key, value in config.items():
            setattr(self, key, value)
        self.API_KEY = config.get('API_KEY')

    def _make_headers(self, method='POST'):
        method = method.upper()
        headers = {'Authorization': 'Bearer ' + self.API_KEY}
        if method == 'POST':
            headers['accept'] = 'application/json'
            # headers['Content-Type'] = 'application/json'

        elif method == 'GET':
            headers['accept'] = 'application/json'
        return headers
    
    def _get(self, endpoint):
        url = f'{self.BASE_URL}/{endpoint}'
        headers = self._make_headers('GET')
        response = requests.get(url, headers=headers)
        return response

    def _post(self, endpoint, data, headers=None, validate = None):
        #self.BASE_URL = 'https://gateway.apiserpro.serpro.gov.br/datavalid-demonstracao/v3'
        
        url = f'{self.BASE_URL}/validate/{endpoint}'
        if validate:
            url = f'{self.BASE_URL}/{endpoint}'
        
        if not headers:
            pass
        headers = self._make_headers()
        data = json.dumps(data, default=self.serialize_date)
        response = requests.post(url, headers=headers,json=json.loads(data))
        return response

    def get_status(self):
        response = self._get('status')
        return response.status_code

    def pf_facial(self, data):
        # print(data)

        with open('teste.json', 'w') as arquivo_json:
            json_data = json.dumps(data, indent=4, default=self.serialize_date)
            arquivo_json.write(json_data)

        response = self._post('pf-facial', data)

        result = {
            'status_code': response.status_code,
            'error_message': None,
            'data': None
        }

        if response.status_code // 100 == 2:
            # Extrai o conteúdo JSON da resposta
            json_content = response.json()
            result['data'] = json_content
        else:
            result['error_message'] = json.loads(response.text)[0]

        return result

        

    def pf_facial_cdv(self, data):
        response = self._post('pf-facial-cdv', data)
        result = {
            'status_code': response.status_code,
            'error_message': None,
            'data': None
        }

        if response.status_code // 100 == 2:
            # Extrai o conteúdo JSON da resposta
            json_content = response.json()
            result['data'] = json_content
        else:
            result['error_message'] = json.loads(response.text)[0]

        return result
    
    
    def get_token(self):
        token_url = "https://gateway.apiserpro.serpro.gov.br/token"
        consumer_key = "cygTBXSG6dA2o5AFNte1Nkuxnbka"
        consumer_secret = "eRJpUpeUkDsd3aVKohuodIDGSPca"
        credentials = f"{consumer_key}:{consumer_secret}"
        encoded_credentials = b64encode(credentials.encode()).decode('utf-8')

        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        }
        
        data = {
           "grant_type": "client_credentials",
        }

        response = requests.post(token_url, data, headers=headers)

        json_responde = response.json()
        self.API_KEY = json_responde['access_token']
        
        return json_responde
        #print(response.status_code)
        #print(response.json())

    def serialize_date(self, obj):
        if isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        raise TypeError("Type not serializable")
    


if __name__ == '__main__':
    d = DataValidAPI()
    with open(r'teste.json', 'r') as f:
        data = json.load(f)
    r = d.pf_facial(data)
    #r = d.get_status()
    #r = d.get_token()
    print(r)

    # print(d.API_KEY)
