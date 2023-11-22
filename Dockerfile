# Use a imagem Python oficial, mas com uma versão específica
FROM python:3.10

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de requirements primeiro para aproveitar o cache do Docker
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante dos arquivos para o diretório de trabalho
COPY . /app/

# Gunicorn deve ser instalado como uma dependência
RUN pip install gunicorn

# Exponha a porta em que o Gunicorn estará rodando
EXPOSE 5000

# Comando para iniciar o Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "run:app"]
