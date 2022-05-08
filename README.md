## Trabalho 1 - CG

### Apresentação do trabalho

[Link para apresentação do trabalho](https://www.youtube.com/watch?v=Dp2nDrLYk08)

### Especificações

#### Para cada modelo

- Translação

  1. Linear

  2. Curva (bezier ou spline)

- Rotação em torno de um eixo

- Rotação em torno de um ponto

- Escala

- Animação: isso quer dizer que a transformação é aplicada gradativamente

  1. Definir uma animação com n passos, por exemplo, translação seguida de uma rotação, seguida de outra translação, etc etc.

  2. Fazer o cálculo do tempo independente da velocidade da máquina!

  3. Recalcule o delta T da interpolação/animação todos os frames e não some valores fixos no delta T, somar valores fixos faz com que seja dependente da velocidade da máquina e dos programas rodando no momento.

- Permitir renderizar vários modelos

  1. Faça uma interface que permite inserir e remover modelos

  2. Lembre que cada malha deve ficar somente uma vez na memória, só os parâmetros das transformações mudam entre modelos renderizados

#### Câmera

- Translação

  1. Linear

  2. Curva (bezier ou spline)

- Rotação em torno de um eixo

- Rotação em torno de um ponto

- Zoom

- Look at

  1. Olhar para um ponto

  2. Acompanhar o modelo enquanto se move

- Animação: isso quer dizer que a transformação é aplicada gradativamente

  1. Definir uma animação com n passos, por exemplo, translação seguida de uma rotação, seguida de outra translação, etc etc.

  2. Fazer o cálculo do tempo independente da velocidade da máquina!

  3. Recalcule o delta T da interpolação/animação todos os frames e não some valores fixos no delta T, somar valores fixos faz com que seja dependente da velocidade da máquina e dos programas rodando no momento.

- Permitir selecionar uma dentre várias câmeras
