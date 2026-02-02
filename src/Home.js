import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            {/* Fake Gradient Header */}
            <View style={styles.header}>
                <View style={styles.circle} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>

                <Text style={styles.subtitle}>
                    Don’t have an account? <Text style={styles.link}>sign up</Text>
                </Text>

                <TextInput
                    placeholder="+1"
                    keyboardType="phone-pad"
                    style={styles.input}
                />

                <View style={styles.passwordBox}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        style={styles.passwordInput}
                    />
                    <Text style={styles.forgot}>FORGOT</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => navigation.navigate('Details')}>Login →</Text>
                </TouchableOpacity>

                {/* Social */}
                <View style={styles.socialRow}>
                    <Text style={styles.social}></Text>
                    <Text style={styles.social}>f</Text>
                    <Text style={styles.social}>G</Text>
                    <Text style={styles.social}>🐦</Text>
                </View>
            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        height: 220,
        backgroundColor: '#acfc9c',
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        overflow: 'hidden',
    },

    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#22c55e',
        position: 'absolute',
        top: -100,
        left: -100,
    },

    content: {
        paddingHorizontal: 24,
        marginTop: 60 % 220,
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
    },

    subtitle: {
        color: '#666',
        marginBottom: 30,
    },

    link: {
        color: '#22c55e',
        fontWeight: '600',
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginBottom: 20,
    },

    passwordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 25,
        paddingHorizontal: 16,
        height: 50,
        justifyContent: 'space-between',
    },

    passwordInput: {
        flex: 1,
    },

    forgot: {
        fontSize: 12,
        color: '#22c55e',
        fontWeight: '600',
    },

    button: {
        backgroundColor: '#22c55e',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        gap: 20,
    },

    social: {
        fontSize: 22,
        color: '#555',
    },
});