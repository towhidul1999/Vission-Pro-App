import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Details = () => {
    const [alarms, setAlarms] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const addAlarm = () => {
        const newAlarm = {
            id: Date.now().toString(),
            date: selectedDate,
            enabled: true,
        };
        setAlarms([...alarms, newAlarm]);
        setShowPicker(false);
    };

    const toggleAlarm = (id) => {
        setAlarms(prev =>
            prev.map(alarm =>
                alarm.id === id
                    ? { ...alarm, enabled: !alarm.enabled }
                    : alarm
            )
        );
    };

    const onChange = (event, date) => {
        if (date) setSelectedDate(date);
    };

    const formatDate = (date) =>
        date.toLocaleDateString();

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⏰ Alarms</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.addButtonText}>+ Set Alarm</Text>
            </TouchableOpacity>

            {showPicker && (
                <View style={styles.pickerBox}>
                    <DateTimePicker
                        value={selectedDate}
                        mode="datetime"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={addAlarm}>
                        <Text style={styles.saveText}>Save Alarm</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.alarmCard}>
                        <View>
                            <Text style={styles.time}>{formatTime(item.date)}</Text>
                            <Text style={styles.label}>{formatDate(item.date)}</Text>
                        </View>

                        <Switch
                            value={item.enabled}
                            onValueChange={() => toggleAlarm(item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default Details;

/* =======================
   STYLES
   ======================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#020617',
        fontSize: 16,
        fontWeight: '600',
    },
    pickerBox: {
        backgroundColor: '#020617',
        borderRadius: 16,
        padding: 10,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#38bdf8',
        padding: 12,
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    saveText: {
        color: '#020617',
        fontWeight: '600',
    },
    alarmCard: {
        backgroundColor: '#1e293b',
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 24,
        color: '#f8fafc',
        fontWeight: '700',
    },
    label: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4,
    },
});
