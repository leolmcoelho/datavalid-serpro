from flask import Flask, request, jsonify, render_template, Blueprint

from app.application import DataAPI

import json

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/pf-facial-cdv', methods=['POST'])
def pf_facial_cdv():
    if request.is_json:
        try:
            data = request.json
            # print(data)
            nome = data.get("answer", {}).get("nome", "")

            api = DataAPI()
            api.get_client()


            return jsonify({"message": f"Recebido com sucesso! Nome: {nome}"})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        # Se a solicitação não contiver dados JSON, retorna um erro
        return jsonify({"error": "A solicitação deve conter dados JSON"}), 400


@api_blueprint.route('/pf-facial', methods=['POST'])
def pf_facial():
    if request.is_json:
        try:
            contrato = 11
            data =request.json 
            print(data)
            contrato = data["contrato"]

            print(contrato)
            api = DataAPI()
            response = api.validacao_facial(data)

            if not contrato:
                return jsonify({"message": f"Não foi passado nenhum numero de contrato"}), 400
            

            return jsonify(response)
        except Exception as e:
            print(e)
            return jsonify({"error": e}), 500
    else:
        # Se a solicitação não contiver dados JSON, retorna um erro
        return jsonify({"error": "A solicitação deve conter dados JSON"}), 400
