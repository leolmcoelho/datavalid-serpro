import socket

def verificar_porta(host, porta):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    resultado = sock.connect_ex((host, porta))
    sock.close()
    return resultado == 0

def descobrir_porta_smtp(host):
    # Portas comuns associadas a serviços SMTP
    portas_smtp = [25, 587, 465, 2525]

    for porta in portas_smtp:
        if verificar_porta(host, porta):
            return porta

    return None

# Substitua 'flyti.net' pelo domínio real em questão
dominio = 'flyti.net'
porta_smtp = descobrir_porta_smtp(dominio)

if porta_smtp is not None:
    print(f"A porta SMTP para o domínio {dominio} é: {porta_smtp}")
else:
    print(f"Não foi possível determinar a porta SMTP para o domínio {dominio}")
