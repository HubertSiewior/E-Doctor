import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {DiseaseForm} from './components/DiseaseForm'
import {Page404} from './components/Error404'
import {SignIn} from "./components/SignIn";
import {SignUp} from "./components/SignUp";
import {DiseaseList} from "./components/DiseaseList"
import {MedecineForm} from "./components/MedicineForm";
import {MedicineList} from "./components/MedicineList";
import {StartPage} from "./components/StartPage";
import {About} from "./components/About";
import {Disease} from './components/Disease'
import {Medicine} from "./components/Medicine";
import {EDoctorForm} from "./components/EDoctorForm";
import {EDoctorHistory} from "./components/EDoctorHistory";

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path='/'>
                    <StartPage/>
                </Route>\
                <Route exact path="/signIn">
                    <SignIn/>
                </Route>

                <Route exact path="/signUp">
                    <SignUp/>
                </Route>

                <Route exact path="/disease">
                    <DiseaseList/>
                </Route>

                <Route exact path="/medicine">
                    <MedicineList/>
                </Route>

                <Route exact path="/medicine/new">
                    <MedecineForm/>
                </Route>

                <Route exact path="/eDoctor/new">
                    <EDoctorForm/>
                </Route>

                <Route exact path="/eDoctor/history">
                    <EDoctorHistory/>
                </Route>

                <Route exact path='/disease/new'>
                    <DiseaseForm/>
                </Route>


                <Route exact path='/disease/:diseaseId'>
                    <Disease/>
                </Route>

                <Route exact path='/medicine/:id'>
                    <Medicine/>
                </Route>

                <Route exact path = '/about'>
                    <About/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </>
    );
};