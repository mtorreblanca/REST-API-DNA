# Introducción

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Está documentación te ayudara a comprender el funcionamiento y uso de esta gran API.

## Descripción

Este proyecto detecta si una persona tiene mutaciones en su ADN.
Al recibir una matriz de _N x N_, se analizan sus filas, columnas y diagonales para lograr identificar que no tengan la misma letra repetida mas de tres veces consecutivamente, de ser así, significa que tiene una mutación.
Ejemplo:

_Sin mutación:_

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| A   | T   | G   | C   | G   | A   |
| C   | A   | G   | T   | G   | C   |
| T   | T   | A   | T   | T   | T   |
| A   | G   | A   | C   | G   | G   |
| G   | C   | G   | T   | C   | A   |
| T   | C   | A   | C   | T   | G   |

_Con mutación:_

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| A   | T   | G   | C   | G   | A   |
| C   | A   | G   | T   | G   | C   |
| T   | T   | A   | T   | G   | T   |
| A   | G   | A   | A   | G   | G   |
| C   | C   | C   | C   | T   | A   |
| T   | C   | A   | C   | T   | G   |

## End Points

### URL del servicio:

> http://teamknowlogydna-env.24csbvpgt9.us-east-1.elasticbeanstalk.com/

A continnuación encontrarás los end points, su respectiva descripción y funcionamiento

#### 1. _/mutation_

La información se envía a traves de un método POST con el siguiente formato

> {
> “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
> }

Si existe mutación regresa HTTP como el siguiente:

> 200-OK

En caso contrario un:

> 403-Forbidden

#### 1. _/stats_

La información se obtiene a traves de un método GET.

Este end point regresa las estadísticas de las verificaciones de ADN en un formato como el siguiente:

> {“count_mutations”:40, “count_no_mutation”:100, “ratio”:0.4}

### Integration Testing

Se hizo un integration Testing para cada endpoint. Se pueden conocer los detalles en la carpeta
./coverage/index.html

El resultado proviene del Code Coverage de Istanbul utilizando Mocha.

Este testing solo puede realizarse localmente si se cuentan con las llaves de la DB para poder conectarse a ella.

### API Testing

Se utilizó POSTMAN como herramienta de Pruebas para la API para el endpoint de mutations.

Los resultados se encuentran en formato json en el archivo EB.postman_test_run.json

Se realizaron 100 peticiones por cada prueba. El tiempo de la prueba fue 57 segundos en total.

**Dev: Marcelo Torreblanca**
**Trabajemos juntos: m_torreblanca@outlook.com**
