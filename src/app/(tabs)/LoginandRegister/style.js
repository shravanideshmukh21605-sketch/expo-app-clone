import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FB", // Light grey background like your Profile screen
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  // ADDED THIS TO FIX YOUR ERROR
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D1F',
    textAlign: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#232F3E', // Navy Blue
    marginTop: 15,
  },
  subText: {
    fontSize: 14,
    color: '#8892A3',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  formCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 24, // Matches your Profile details card
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: '#8892A3',
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase', // Professional Fintech look
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
    borderWidth: 1,
    borderColor: '#EEF0F2',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1D1F',
  },
  primaryBtn: {
    backgroundColor: '#232F3E', // Navy Blue
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  linkText: {
    color: '#D32F2F', // Brand Red
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // Radio Button Styles for Register
  radioButton_div: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FB',
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEF0F2',
  },
  radioButton_inner_div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton_title: {
    fontSize: 13,
    color: '#8892A3',
    fontWeight: '700',
  },
  radioButton_text: {
    fontSize: 14,
    color: '#1A1D1F',
    fontWeight: '600',
    marginLeft: 4,
  }
});