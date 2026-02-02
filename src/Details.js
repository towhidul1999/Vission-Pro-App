import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch
} from 'react-native';

const Details = () => {
    const [alarms, setAlarms] = useState([
        { id: '1', time: '07:00 AM', label: 'Morning Alarm', enabled: true },
        { id: '2', time: '09:30 AM', label: 'Office Alarm', enabled: false },
    ]);

    const toggleAlarm = (id) => {
        setAlarms(prev =>
            prev.map(alarm =>
                alarm.id === id
                    ? { ...alarm, enabled: !alarm.enabled }
                    : alarm
            )
        );
    };

    const addAlarm = () => {
        const newAlarm = {
            id: Date.now().toString(),
            time: '06:00 AM',
            label: 'New Alarm',
            enabled: true,
        };
        setAlarms([...alarms, newAlarm]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⏰ Alarms</Text>

            <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
                <Text style={styles.addButtonText}>+ Add Alarm</Text>
            </TouchableOpacity>

            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.alarmCard}>
                        <View>
                            <Text style={styles.time}>{item.time}</Text>
                            <Text style={styles.label}>{item.label}</Text>
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
   STYLES (CSS-LIKE)
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
        marginBottom: 20,
    },
    addButtonText: {
        color: '#020617',
        fontSize: 16,
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
