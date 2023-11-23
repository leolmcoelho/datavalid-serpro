from flask import Flask, request, jsonify, render_template, Blueprint

from app.application import DataAPI
import traceback
import json

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/pf-facial-cdv', methods=['POST'])
def pf_facial_cdv():
    try:
        # Obter dados brutos da solicitação
        raw_data = request.get_data(as_text=True)
        data = json.loads(raw_data)
        contrato = data.get("contrato")  # Use .get() para evitar KeyError se "contrato" não estiver presente
        images = data.get("images")

        api = DataAPI()
        response = api.validacao_documento(data)

        if not contrato:
            return jsonify({"message": "Não foi passado nenhum número de contrato"}), 400

        return jsonify(response)

    except json.decoder.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return jsonify({"error": "Falha ao decodificar objeto JSON"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@api_blueprint.route('/pf-facial', methods=['POST'])
def pf_facial():
    try:
        # Obter dados brutos da solicitação
        raw_data = request.get_data(as_text=True)
        #print(raw_data)

        # Tentar analisar manualmente os dados como JSON
        data = json.loads(raw_data)

        #print(data.keys())
        # Continue com o processamento dos dados
        contrato = data.get("contrato")  # Use .get() para evitar KeyError se "contrato" não estiver presente
        if not contrato:
            return jsonify({"message": "Não foi passado nenhum número de contrato"}), 400

        
        images = data.get("images")

        #print(images)

        api = DataAPI()
        response = api.validacao_facial(data)

        return jsonify(response)

    except json.decoder.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return jsonify({"error": "Falha ao decodificar objeto JSON", "code": 400}), 400
    
    except Exception as e:
        #print(e)
        traceback.print_exc()
        
        return jsonify({"error": str(e), "code": 500}), 500
