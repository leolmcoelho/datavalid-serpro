import sys
import os
sys.path.append(os.getcwd())

from app.connection.handler import DataHandler
from app.connection.datavalid import DataValidAPI



class DataAPI(DataValidAPI, DataHandler):

    def __init__(self):
        super(DataHandler, self).__init__()
        super(DataValidAPI, self).__init__()

        pass

    def validacao_facial(self, data):
        contrato = data["contrato"]

        data = self.get_client(contrato, True)


        return data

        # self.pf_facial()


if __name__ == "__main__":

    data = {
        "contrato": 20015011
    }

    d = DataAPI()
    r = d.validacao_facial(data)

    print(r)
