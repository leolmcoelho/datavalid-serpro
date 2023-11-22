from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey
# Defina a base de classes declarativas
Base = declarative_base()

# Defina as classes para as tabelas do banco de dados


class Cota(Base):
    __tablename__ = 'cotas'
    numero_contrato = Column(String, primary_key=True)
    CGC_CPF_CLIENTE = Column(String, ForeignKey('clientes.CGC_CPF_CLIENTE'))
    cliente = relationship('Cliente')


class Cliente(Base):
    __tablename__ = 'clientes'
    CGC_CPF_CLIENTE = Column(String, primary_key=True)
    NOME = Column(String)
    sexo = Column(String)
    data_nascimento = Column(Date)
    CODIGO_TIPO_DOC_IDENT = Column(Integer)
    NACIONALIDADE = Column(String)
    nome_pai = Column(String)
    NOME_MAE = Column(String)
    DOCUMENTO = Column(String)
    ORGAO_EMISSOR = Column(String)
    UF_DOC_CLIENTE = Column(String)
    ENDERECO = Column(String)
    bairro = Column(String)
    CEP = Column(String)
    CODIGO_CIDADE = Column(Integer, ForeignKey('cidades.CODIGO_CIDADE'))
    cidade = relationship('Cidade')


class Cidade(Base):
    __tablename__ = 'cidades'
    CODIGO_CIDADE = Column(Integer, primary_key=True)
    NOME = Column(String)
    ESTADO = Column(String)


class ResultadoInterface:
    def __init__(self, numero_contrato, 
                 CGC_CPF_CLIENTE, 
                 NOME, 
                 sexo, 
                 data_nascimento,
                 CODIGO_TIPO_DOC_IDENT,
                 NACIONALIDADE,
                 nome_pai, 
                 NOME_MAE, 
                 DOCUMENTO,
                 ORGAO_EMISSOR, 
                 UF_DOC_CLIENTE, 
                 ENDERECO, 
                 bairro, 
                 CEP, 
                 cidade, 
                 UF):
        self.numero_contrato = numero_contrato
        self.CGC_CPF_CLIENTE = CGC_CPF_CLIENTE
        self.NOME = NOME
        self.sexo = sexo
        self.data_nascimento = data_nascimento
        self.CODIGO_TIPO_DOC_IDENT = CODIGO_TIPO_DOC_IDENT
        self.NACIONALIDADE = NACIONALIDADE
        self.nome_pai = nome_pai
        self.NOME_MAE = NOME_MAE
        self.DOCUMENTO = DOCUMENTO
        self.ORGAO_EMISSOR = ORGAO_EMISSOR
        self.UF_DOC_CLIENTE = UF_DOC_CLIENTE
        self.ENDERECO = ENDERECO
        self.bairro = bairro
        self.CEP = CEP
        self.cidade = cidade
        self.UF = UF
