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
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());

    const addAlarm = () => {
        // Combine selected date and time
        const combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(selectedTime.getHours());
        combinedDateTime.setMinutes(selectedTime.getMinutes());
        combinedDateTime.setSeconds(0);

        const newAlarm = {
            id: Date.now().toString(),
            date: combinedDateTime,
            enabled: true,
        };
        setAlarms([...alarms, newAlarm]);
        setShowDatePicker(false);
        setShowTimePicker(false);
        // Reset to current date/time for next alarm
        setSelectedDate(new Date());
        setSelectedTime(new Date());
    };

    const deleteAlarm = (id) => {
        setAlarms(prev => prev.filter(alarm => alarm.id !== id));
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

    const onDateChange = (event, date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            setSelectedDate(date);
            // On Android, automatically show time picker after date selection
            if (Platform.OS === 'android') {
                setTimeout(() => setShowTimePicker(true), 100);
            }
        }
    };

    const onTimeChange = (event, time) => {
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        if (time) {
            setSelectedTime(time);
        }
    };

    const formatDate = (date) =>
        date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

    const formatTime = (date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const startAddingAlarm = () => {
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setShowDatePicker(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⏰ Alarms</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={startAddingAlarm}
            >
                <Text style={styles.addButtonText}>+ Set New Alarm</Text>
            </TouchableOpacity>

            {/* iOS: Show both pickers together */}
            {Platform.OS === 'ios' && (showDatePicker || showTimePicker) && (
                <View style={styles.pickerBox}>
                    <Text style={styles.pickerLabel}>Select Date</Text>
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="spinner"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />

                    <Text style={styles.pickerLabel}>Select Time</Text>
                    <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        display="spinner"
                        onChange={onTimeChange}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setShowDatePicker(false);
                                setShowTimePicker(false);
                            }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={addAlarm}
                        >
                            <Text style={styles.saveText}>Save Alarm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Android: Show date picker */}
            {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}

            {/* Android: Show time picker */}
            {Platform.OS === 'android' && showTimePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}

            {/* Android: Show confirm button after selections */}
            {Platform.OS === 'android' && !showDatePicker && !showTimePicker && selectedDate && selectedTime && (
                <View style={styles.androidConfirm}>
                    <Text style={styles.selectedText}>
                        Selected: {formatDate(selectedDate)} at {formatTime(selectedTime)}
                    </Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setSelectedDate(new Date());
                                setSelectedTime(new Date());
                            }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={addAlarm}
                        >
                            <Text style={styles.saveText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.alarmCard}>
                        <View style={styles.alarmInfo}>
                            <Text style={styles.time}>{formatTime(item.date)}</Text>
                            <Text style={styles.label}>{formatDate(item.date)}</Text>
                        </View>

                        <View style={styles.alarmActions}>
                            <Switch
                                value={item.enabled}
                                onValueChange={() => toggleAlarm(item.id)}
                                trackColor={{ false: '#334155', true: '#22c55e' }}
                                thumbColor={item.enabled ? '#ffffff' : '#94a3b8'}
                            />
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteAlarm(item.id)}
                            >
                                <Text style={styles.deleteText}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No alarms set</Text>
                        <Text style={styles.emptySubtext}>Tap "Set New Alarm" to create one</Text>
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
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    pickerLabel: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 12,
    },
    saveButton: {
        backgroundColor: '#38bdf8',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
    },
    saveText: {
        color: '#020617',
        fontWeight: '600',
        fontSize: 15,
    },
    cancelButton: {
        backgroundColor: '#475569',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
    },
    cancelText: {
        color: '#f8fafc',
        fontWeight: '600',
        fontSize: 15,
    },
    androidConfirm: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    selectedText: {
        color: '#f8fafc',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
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
    alarmInfo: {
        flex: 1,
    },
    alarmActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
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
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 18,
        fontWeight: '600',
    },
    emptySubtext: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 8,
    },
});