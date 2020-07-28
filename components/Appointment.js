import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Appointment = ({appointment, eliminatePatient}) => {

    const eliminateDialog = id => {
        console.log('Eliminating...', id);
        eliminatePatient(id);
    };

    return (
        <View style={styles.appointment}>
            <View style={styles.text}>
                <Text style={styles.label}>Patient: </Text>
                <Text style={styles.text}>{appointment.patient}</Text>
            </View>
            <View>
                <Text style={styles.label}>Owner: </Text>
                <Text style={styles.text}>{appointment.owner}</Text>
            </View>
            <View>
                <Text style={styles.label}>Symptoms: </Text>
                <Text style={styles.text}>{appointment.symptoms}</Text>
            </View>

            <View>
                <TouchableHighlight style={styles.btnEliminate} onPress={() => eliminateDialog(appointment.id)}>
                        <Text style={styles.eliminateText}>Eliminate &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appointment: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    text: {
        fontSize: 18,
    },
    btnEliminate: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10,
    },
    eliminateText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Appointment;
