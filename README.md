# Angular12 disease classifier

An angular 12 single app application that takes a json object as an input
and classify a disease.

It features two calculators pages:
* A Hypertension calculator
* A Kidney disease calculator

The Hypertension calculator takes input objects in the format of:

`[
{SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},  
{ SysBP: 115, DiaBP: 100, atDate: '2018/10/20'}
]`

The Kidney disease calculator takes input objects in the format of:

`[
{eGFR: 65, atDate: '2018/10/31'},
{eGFR: 70, atDate: '2018/10/20'}
]
`

Dates need to be in the format: YYYY/MM/DD. 


## Live demo
You can check the live demo of this project [here](https://vbazurtob.github.io/angular12-disease-classifier/)

## How to build

1. Run `npm install`
2. Run `npm run start`
3. Open in a web browser `http://localhost/:4200`

Author: Voltaire Bazurto  
All rights reserved 2021

