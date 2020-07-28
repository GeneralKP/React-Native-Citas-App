import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';


const Form = ({appointments, setAppointments, setShowForm, storageAppointments}) => {

    const [patient, setPatient] = useState('');
    const [owner, setOwner] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmDate = (date) => {
        const options = {year: 'numeric', month: 'long', day: '2-digit'};
        setDate(date.toLocaleDateString('es-ES', options));
        hideDatePicker();
    };

    //Shows or hides TimePicker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmTime = (time) => {
        const options = {hour: 'numeric', minute: '2-digit', hour12: false};
        setTime(time.toLocaleString('en-US', options));
        hideTimePicker();
    };

    const createNewAppointment = () => {
        //Validate
        if (patient.trim() === '' || owner.trim() === '' || phone.trim() === '' || date.trim() === '' ||
            time.trim() === '' || symptoms.trim() === '') {
            //Validation fails
            showAlert();
            return;
        }

        //Create a new appointment
        const newAppointment = {patient, owner, phone, date, time, symptoms};
        newAppointment.id = shortid.generate();

        //Add to the state
        const newAppointments = [...appointments, newAppointment];
        setAppointments(newAppointments);

        console.log('Nueva cita: ' , newAppointments);
        console.log('Citas del state: ' , appointments);

        //Pass new appointments to local storage
        storageAppointments(JSON.stringify(newAppointments));

        //Hide the form
        setShowForm(false);

        //Reset the form

    }

    //Shows the alert if the validation fails
    const showAlert = () => {
        Alert.alert(
            'Error',
            'All fields must be filled',
            [{text: 'OK'}]
        )
    }


    return (
        <>

            <ScrollView>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Patient: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setPatient(text)}

                        />
                    </View>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Owner: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setOwner(text)}

                        />
                    </View>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Phone number: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setPhone(text)}
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Date:</Text>
                    <Button title="Pick Date" onPress={showDatePicker}/>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmDate}
                        onCancel={hideDatePicker}
                        headerTextIOs='Pick a date'
                        cancelTextIOS='Cancel'
                        confirmTextIOS='Cancel'
                    />
                    <Text>{date}</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Hour:</Text>
                    <Button title="Pick Time" onPress={showTimePicker}/>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode='time'
                        onConfirm={confirmTime}
                        onCancel={hideTimePicker}
                        headerTextIOs='Pick a time'
                        cancelTextIOS='Cancel'
                        confirmTextIOS='Cancel'
                        //is24Hour
                    />
                    <Text>{time}</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Symptoms: </Text>
                        <TextInput
                            multiline
                            style={styles.input}
                            onChangeText={text => setSymptoms(text)}
                        />
                    </View>
                </View>
                <View style={styles.form}>
                    <TouchableHighlight style={styles.btnSubmit} onPress={() => createNewAppointment()}>
                        <Text style={styles.submitText}>Create new appointment</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
    },
    input: {
        marginTop: 5,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 5,
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 5,
    },
    submitText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Form;