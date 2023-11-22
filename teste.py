import dns.resolver

def obter_servidor_smtp(domino):
    try:
        registros_mx = dns.resolver.resolve(domino, 'MX')
        primeiro_registro_mx = registros_mx[0].exchange.to_text()
        return primeiro_registro_mx
    except Exception as e:
        return f"Erro: {str(e)}"

# Substitua 'flyti.net' pelo domínio real em questão
dominio = 'flyti.net'
servidor_smtp = obter_servidor_smtp(dominio)

print(f"Servidor SMTP para o domínio {dominio}: {servidor_smtp}")
