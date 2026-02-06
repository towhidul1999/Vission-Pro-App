import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Details = () => {
    const [alarms, setAlarms] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isSelecting, setIsSelecting] = useState(false);

    const startAddingAlarm = () => {
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setShowDatePicker(true);
        setIsSelecting(true);
    };

    const cancelSelection = () => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        setIsSelecting(false);
    };

    const addAlarm = () => {
        const combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(selectedTime.getHours());
        combinedDateTime.setMinutes(selectedTime.getMinutes());
        combinedDateTime.setSeconds(0);

        setAlarms(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                date: combinedDateTime,
                enabled: true,
            },
        ]);

        cancelSelection();
    };

    const toggleAlarm = (id) => {
        setAlarms(prev =>
            prev.map(a =>
                a.id === id ? { ...a, enabled: !a.enabled } : a
            )
        );
    };

    const deleteAlarm = (id) => {
        setAlarms(prev => prev.filter(a => a.id !== id));
    };

    const onDateChange = (event, date) => {
        if (Platform.OS === 'android') setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            if (Platform.OS === 'android') {
                setTimeout(() => setShowTimePicker(true), 150);
            }
        }
    };

    const onTimeChange = (event, time) => {
        if (Platform.OS === 'android') setShowTimePicker(false);
        if (time) setSelectedTime(time);
    };

    const formatDate = (d) =>
        d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    const formatTime = (d) =>
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <SafeAreaView style={styles.safe}>
            {/* TOP SECTION (SCROLLABLE) */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>⏰ Alarms</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={startAddingAlarm}
                >
                    <Text style={styles.addButtonText}>+ Set New Alarm</Text>
                </TouchableOpacity>

                {/* iOS PICKERS */}
                {Platform.OS === 'ios' && isSelecting && (
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerHeaderText}>Set Alarm</Text>

                        <View style={styles.pickerBox}>
                            <Text style={styles.pickerLabel}>Date</Text>
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="spinner"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                                textColor="#ffffff"
                            />
                        </View>

                        <View style={styles.pickerBox}>
                            <Text style={styles.pickerLabel}>Time</Text>
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                display="spinner"
                                onChange={onTimeChange}
                                textColor="#ffffff"
                            />
                        </View>

                        <View style={styles.previewBox}>
                            <Text style={styles.previewTime}>
                                {formatTime(selectedTime)}
                            </Text>
                            <Text style={styles.previewDate}>
                                {formatDate(selectedDate)}
                            </Text>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={cancelSelection}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={addAlarm}
                            >
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* ANDROID PICKERS */}
                {Platform.OS === 'android' && showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}

                {Platform.OS === 'android' && showTimePicker && (
                    <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        onChange={onTimeChange}
                    />
                )}
            </ScrollView>

            {/* ALARM LIST */}
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.alarmCard,
                            !item.enabled && styles.alarmDisabled,
                        ]}
                    >
                        <View>
                            <Text style={styles.time}>{formatTime(item.date)}</Text>
                            <Text style={styles.label}>{formatDate(item.date)}</Text>
                        </View>

                        <View style={styles.actions}>
                            <Switch
                                value={item.enabled}
                                onValueChange={() => toggleAlarm(item.id)}
                            />
                            <TouchableOpacity onPress={() => deleteAlarm(item.id)}>
                                <Text style={styles.delete}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No alarms yet. Add one ⏰
                    </Text>
                }
            />
        </SafeAreaView>
    );
};

export default Details;

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    scrollContent: {
        padding: 20,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#22c55e',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#020617',
        fontWeight: '700',
    },
    pickerContainer: {
        backgroundColor: '#1e293b',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    pickerHeaderText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
    },
    pickerBox: {
        backgroundColor: '#0f172a',
        borderRadius: 14,
        marginBottom: 16,
        overflow: 'hidden',
    },
    pickerLabel: {
        color: '#94a3b8',
        padding: 10,
        fontWeight: '600',
    },
    previewBox: {
        alignItems: 'center',
        marginVertical: 12,
    },
    previewTime: {
        fontSize: 32,
        color: '#22c55e',
        fontWeight: '700',
    },
    previewDate: {
        color: '#38bdf8',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#22c55e',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveText: {
        color: '#020617',
        fontWeight: '700',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#475569',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelText: {
        color: '#fff',
        fontWeight: '700',
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
    alarmDisabled: {
        opacity: 0.5,
    },
    time: {
        fontSize: 26,
        color: '#fff',
        fontWeight: '700',
    },
    label: {
        color: '#94a3b8',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    delete: {
        fontSize: 18,
    },
    emptyText: {
        color: '#64748b',
        textAlign: 'center',
        marginTop: 40,
    },
});
