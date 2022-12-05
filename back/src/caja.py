'''
    CAJA FUERTE SIMULADA CON AUTÓMATAS
'''

from src.dfa import DFA
from src.draw import generateDFA
import os

class Caja:

    #/ Atributos:
    password: str = ""
    dfa: DFA = DFA()

    #/ ----------------------------------------------------

    #* Constructor:
    def __init__(self, combination: str = ""):
        if len(combination) >= 4:
            self.password = combination
            self.dfa = generateDFA(self.password)
        else:
            print(f"La contraseña {combination} no es válida D:")
        self.close()

    #* Getter:
    def __getattribute__(self, __name: str):
        return super(Caja, self).__getattribute__(__name)
    
    #* Setters:
    def setPassword(self, newPassword: str):
        self.reset(newPassword)
    
    #* ----------------------------------------------------

    # Métodos de entr

    #? Métodos:
    def reset(self, newPassword):
        if len(newPassword) >= 4:
            self.password = newPassword
            self.dfa = generateDFA(self.password)
        else:
            print(f"La contraseña {newPassword} no es válida D:")
        self.close()
    
    def move(self, direction: str):
        self.dfa.transite(direction)
        if self.dfa.actual in self.dfa.Finals:
            self.open()
            return True
        else:
            return False
    
    def open(self):
        print("\n\n¡¡¡CAJA ABIERTA!!!")
    
    def close(self):
        self.dfa.actual = self.dfa.Initial
        self.dfa.error = False
    
    #? ----------------------------------------------------

if __name__ == "__main__":

    os.system("cls");

    #* Simulación:
    print("\n\n| CAJA FUERTE AUTÓMATA |\n")
    print("* Crea una contraseña para tu caja fuerte.")
    password = input("\nContraseña: ")
    MiCaja = Caja(password)
    print("\n\nTrata de abrirla:\n")
    while True:
        MiCaja.move(input("* "))