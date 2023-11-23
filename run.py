# run.py
from app import app



if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000, debug=True)
        #ls.run("0.0.0.0", 8080, debug=True)
    except KeyboardInterrupt as e:
        print("Error running", e)
        exit()

    except Exception as e:
        print('Error running', e)
        pass
