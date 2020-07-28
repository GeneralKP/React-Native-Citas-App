import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';
import Appointment from './components/Appointment';
import Form from './components/Form';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
    const [showForm, setShowForm] = useState(false);

    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const getStorageAppointments = async () => {
            try {
                const storedAppointments = await AsyncStorage.getItem('appointments');
                if (storedAppointments){
                    setAppointments(JSON.parse(storedAppointments));
                    console.log('Appointments: ' + appointments);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getStorageAppointments();
    }, [])


    //Eliminates patients from state
    const eliminatePatient = id => {

        const filteredAppointments = appointments.filter(appointment => appointment.id !== id);

        setAppointments(filteredAppointments);
        storageAppointments(JSON.stringify(filteredAppointments));
    }

    //Show or hide the form
    const showOrHideForm = () => {
        setShowForm(!showForm);
    }

    const closeKeyboard = () => {
        Keyboard.dismiss();
    }

    //Storage appointments
    const storageAppointments = async (appointmentsJSON) => {
        try {
            await AsyncStorage.setItem('appointments', appointmentsJSON);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={styles.container}>
                <Text style={styles.title}>Appointment manager</Text>
                <View>
                    <TouchableHighlight style={styles.btnShowForm} onPress={showOrHideForm}>
                        <Text
                            style={styles.showFormText}>{showForm ? 'Cancel create new appointment ' : 'Create new appointment'}</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.content}>
                    {showForm ? (
                        <>
                            <Text style={styles.title}>Create new appointment</Text>
                            <Form
                                appointments={appointments}
                                setAppointments={setAppointments}
                                setShowForm={setShowForm}
                                storageAppointments={storageAppointments}
                            />
                        </>
                    ) : (
                        <>
                            <Text
                                style={styles.title}>{appointments.length > 0 ? 'Manage your appointments' : 'There\'re no appointments. Add one'}</Text>
                             <FlatList
                                style={styles.list}
                                keyExtractor={appointment => appointment.id}
                                data={appointments}
                                renderItem={({item}) => <Appointment
                                    appointment={item}
                                    eliminatePatient={eliminatePatient}
                                />}
                            />
                        </>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AA076B',
        flex: 1,
    },
    title: {
        color: '#FFF',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        marginHorizontal: '2.5%'
    },
    list: {
        flex: 1,

    },
    btnShowForm: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 5,
    },
    showFormText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App;
