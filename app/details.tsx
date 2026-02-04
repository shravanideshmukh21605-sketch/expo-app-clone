import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AlertCircle, ChevronDown, ChevronLeft, Info, Minus, Phone, Plus } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

type TimeRange = '1M' | '3M' | '1Y' | '2Y' | '3Y';
type FinancialSubTab = 'Profit & Loss' | 'Balance Sheet';

export default function InvestmentDetails() {
  const router = useRouter();
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();
  
  const [units, setUnits] = useState(400);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>('2Y');
  const [activeTab, setActiveTab] = useState('Fundamentals');
  const [activeFinancialTab, setActiveFinancialTab] = useState<FinancialSubTab>('Profit & Loss');

  const isExiting = useRef(false);

  // --- CROSS-PLATFORM BACK LOGIC ---
  useEffect(() => {
    if (Platform.OS === 'web') {
      // 1. Browser history mein ek naya state push karo (Trap set karne ke liye)
      window.history.pushState({ noBack: true }, '');

      const handleWebBack = (event: PopStateEvent) => {
        if (!isExiting.current) {
          // Modal dikhao aur history mein wapas wahi state daal do taaki page na badle
          setIsModalVisible(true);
          window.history.pushState({ noBack: true }, '');
        }
      };

      window.addEventListener('popstate', handleWebBack);
      return () => window.removeEventListener('popstate', handleWebBack);
    } else {
      // MOBILE Logic (Android/iOS)
      const onBackPress = () => {
        if (!isModalVisible) {
          setIsModalVisible(true);
          return true; 
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      const unsubscribeNavigation = navigation.addListener('beforeRemove', (e) => {
        if (isExiting.current) return;
        e.preventDefault();
        setIsModalVisible(true);
      });

      return () => {
        subscription.remove();
        unsubscribeNavigation();
      };
    }
  }, [navigation, isModalVisible]);

  const handleConfirmExit = () => {
    isExiting.current = true;
    setIsModalVisible(false);
    
    if (Platform.OS === 'web') {
      // Web par hame history mein peeche jana padega
      // -1 for the current fake state, -1 for the actual entry
      window.history.go(-2);
    } else {
      router.back();
    }
  };

  const pricePerUnit = 6.35; 
  const investmentAmount = units * pricePerUnit;

  const chartPaths: Record<TimeRange, string> = {
    '1M': "M0 120 L40 80 L80 80 L80 40 L120 40 L150 100 L200 100 L250 60 L300 60",
    '3M': "M0 100 L60 40 L120 40 L120 90 L180 90 L240 20 L300 20",
    '1Y': "M0 80 L50 80 L50 20 L100 20 L150 110 L220 110 L260 50 L300 50",
    '2Y': "M0 100 L10 60 L20 60 L20 10 L40 10 L40 60 L50 10 L60 10 L60 100 L120 100 L140 70 L180 70 L200 100 L300 100",
    '3Y': "M0 130 L100 40 L180 40 L180 110 L250 110 L300 30",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section with Modal Trigger on Back Click */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <ChevronLeft size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {name || "Metropolitan Stock Exchange..."}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCard}>
          <View style={styles.kycBanner}>
            <AlertCircle size={18} color="#d32f2f" />
            <Text style={styles.kycText}>
              Complete your KYC and get up to ₹200 cashback and 0.25% offer benefit on your 1st transaction. 
              <Text style={styles.linkText}> Click here to Complete Now.</Text>
            </Text>
          </View>

          <View style={styles.summarySection}>
            <View style={styles.logoRow}>
              <View style={styles.logoBox}><Text style={styles.logoTxt}>XMSE</Text></View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.compName}>{name || "Metropolitan Stock Exchange of India Ltd"}</Text>
                <Text style={styles.priceTrend}>₹6.35 <Text style={styles.greenText}>+2.55 (67.11%) 1M</Text></Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}><Text style={styles.rowLabel}>Price per Unit</Text><Text style={styles.rowValue}>₹6.35</Text></View>
            <View style={styles.infoRow}><Text style={styles.rowLabel}>Minimum number of Units</Text><Text style={styles.rowValue}>400</Text></View>
            <View style={styles.infoRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={styles.rowLabel}>Settlement Date </Text><Info size={14} color="#999" style={{ marginLeft: 4 }} /></View>
              <Text style={styles.rowValue}>10 Feb 2026</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>Enter Units</Text>
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={() => setUnits(Math.max(400, units - 1))} style={styles.countBtn}><Minus size={20} color="black" /></TouchableOpacity>
              <View style={styles.unitDisplay}><Text style={styles.unitText}>{units}</Text></View>
              <TouchableOpacity onPress={() => setUnits(units + 1)} style={styles.countBtn}><Plus size={20} color="black" /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.amountSection}>
            <View style={styles.infoRow}><Text style={styles.rowLabel}>Investment Amount</Text><Text style={styles.rowValue}>₹{investmentAmount.toLocaleString()}</Text></View>
            <View style={[styles.infoRow, { marginTop: 15, marginBottom: 20 }]}><Text style={styles.rowLabel}>Total Investment Amount</Text><Text style={styles.rowValue}>₹{investmentAmount.toLocaleString()}</Text></View>
            <TouchableOpacity style={styles.getStartedBtn}><Text style={styles.btnText}>Get started</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.graphSection}>
          <Text style={styles.graphTitle}>{name || "Metropolitan Stock Exchange of India Ltd"}</Text>
          <View style={styles.graphPriceRow}>
            <Text style={styles.graphPriceText}>₹6.35</Text>
            <Text style={styles.graphSubText}>+4.27 (205.29%) {activeTimeRange} <Info size={14} color="#888" /></Text>
          </View>

          <View style={styles.chartContainer}>
            <Svg height="150" width="100%" viewBox="0 0 300 150">
                {[0, 50, 100].map((y) => (
                    <Path key={y} d={`M0 ${y} L300 ${y}`} stroke="#f2f2f2" strokeWidth="1" />
                ))}
                <Path
                    d={chartPaths[activeTimeRange]}
                    fill="none"
                    stroke="#d32f2f"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
            </Svg>
          </View>

          <View style={styles.timeRangeContainer}>
            {(['1M', '3M', '1Y', '2Y', '3Y'] as TimeRange[]).map((range) => (
              <TouchableOpacity 
                key={range} 
                onPress={() => setActiveTimeRange(range)}
                style={[styles.rangeBtn, activeTimeRange === range && styles.activeRangeBtn]}
              >
                <Text style={[styles.rangeText, activeTimeRange === range && styles.activeRangeText]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomTabContainer}>
            {['Fundamentals', 'Key Financials', 'Shareholding'].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.bottomTab, activeTab === tab && styles.activeBottomTab]}
              >
                <Text style={[styles.bottomTabText, activeTab === tab && styles.activeBottomTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContentArea}>
            {activeTab === 'Fundamentals' && (
              <View>
                <Text style={styles.contentTitle}>{name || "Metropolitan Stock Exchange of India Ltd"}</Text>
                <Text style={styles.contentSubTitle}>Exchange</Text>
                <View style={styles.fundamentalsGrid}>
                  <View style={styles.gridRow}>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>Current Price</Text><Text style={styles.gridValue}>₹6.35</Text></View>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>Market Cap</Text><Text style={styles.gridValue}>₹6,985.14 Cr</Text></View>
                  </View>
                  <View style={styles.gridRow}>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>Face Value</Text><Text style={styles.gridValue}>₹1</Text></View>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>P/B Ratio</Text><Text style={styles.gridValue}>15.87</Text></View>
                  </View>
                  <View style={styles.gridRow}>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>Book Value</Text><Text style={styles.gridValue}>₹0.40</Text></View>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>ISIN</Text><Text style={styles.gridValue}>INE312K01010</Text></View>
                  </View>
                  <View style={styles.gridRow}>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>EPS</Text><Text style={styles.gridValue}>₹-0.06</Text></View>
                    <View style={styles.gridItem}><Text style={styles.gridLabel}>Debt to Equity Ratio</Text><Text style={styles.gridValue}>0</Text></View>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'Key Financials' && (
              <View>
                <View style={styles.financialSubTabRow}>
                  {['Profit & Loss', 'Balance Sheet'].map((sub) => (
                    <TouchableOpacity 
                      key={sub} 
                      onPress={() => setActiveFinancialTab(sub as FinancialSubTab)}
                      style={[styles.subTabBtn, activeFinancialTab === sub && styles.activeSubTabBtn]}
                    >
                      <Text style={[styles.subTabText, activeFinancialTab === sub && styles.activeSubTabText]}>{sub}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.financialHeaderRow}>
                  <Text style={styles.currencyNote}>(in Rs. Crore)</Text>
                  <TouchableOpacity style={styles.yearSelector}>
                    <Text style={styles.yearText}>FY2025</Text>
                    <ChevronDown size={14} color="#333" />
                  </TouchableOpacity>
                </View>
                {activeFinancialTab === 'Profit & Loss' ? (
                  <View style={styles.financialTable}>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Revenue from Operations</Text><Text style={styles.tableValue}>4.31</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Growth %</Text><Text style={styles.tableValueRed}>-41.44%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Operating Expenses</Text><Text style={styles.tableValue}>46.87</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Growth %</Text><Text style={styles.tableValueRed}>-23.91%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Operating Profit</Text><Text style={styles.tableValueRed}>-42.56</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Op. Profit Margin %</Text><Text style={styles.tableValueRed}>-987.47%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Other Income</Text><Text style={styles.tableValue}>13.07</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Finance Costs</Text><Text style={styles.tableValue}>0.26</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Depreciation</Text><Text style={styles.tableValue}>5.10</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Profit Before Tax</Text><Text style={styles.tableValueRed}>-34.85</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Tax</Text><Text style={styles.tableValueRed}>-0.63</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Tax %</Text><Text style={styles.tableValue}>1.81%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Profit After Tax</Text><Text style={styles.tableValueRed}>-34.22</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Growth %</Text><Text style={styles.tableValue}>29.79%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>PAT %</Text><Text style={styles.tableValueRed}>-793.97%</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Diluted EPS</Text><Text style={styles.tableValueRed}>-0.06</Text></View>
                  </View>
                ) : (
                  <View style={styles.financialTable}>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Equity Capital</Text><Text style={styles.tableValue}>599.92</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Reserves</Text><Text style={styles.tableValueRed}>-203.20</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Total Equity</Text><Text style={styles.tableValue}>396.72</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Borrowings</Text><Text style={styles.tableValue}>0.00</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Provisions</Text><Text style={styles.tableValue}>0.07</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Deferred Tax Liability</Text><Text style={styles.tableValue}>0.00</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Total Non Current Liabilities</Text><Text style={styles.tableValue}>30.11</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Borrowings</Text><Text style={styles.tableValue}>0.00</Text></View>
                    <View style={styles.tableRow}><Text style={styles.tableLabel}>Other Current Liabilities</Text><Text style={styles.tableValue}>17.03</Text></View>
                  </View>
                )}
              </View>
            )}

            {activeTab === 'Shareholding' && (
              <View>
                <View style={[styles.tableRow, { borderBottomColor: '#333', borderBottomWidth: 1.5 }]}>
                  <Text style={[styles.tableLabel, { fontWeight: '700', color: '#333' }]}>Name</Text>
                  <Text style={[styles.tableValue, { fontWeight: '700', color: '#333' }]}>Holding</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableLabel, { flex: 1, paddingRight: 20 }]}>Multi Commodity Exchange Of India Ltd</Text>
                  <Text style={styles.tableValue}>6.90%</Text>
                </View>
                <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.tableLabel}>Others</Text>
                  <Text style={styles.tableValue}>93.10%</Text>
                </View>
                <View style={styles.shareholderNoteBox}>
                  <Text style={styles.shareholderNoteText}>
                    *Shares are held in the capacity as a Trustee of Financial Service Trust and Securities Services Trust.
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.aboutCoContainer}>
              <Text style={styles.boldAccordionText}>About Co.</Text>
              <ChevronDown size={20} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.aboutCoContainer}>
              <Text style={styles.boldAccordionText}>Board of Directors</Text>
              <ChevronDown size={20} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.aboutCoContainer}>
              <Text style={styles.boldAccordionText}>Documents</Text>
              <ChevronDown size={20} color="#333" />
            </TouchableOpacity>

            <View style={{ marginTop: 25 }}>
              <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.investNowBtn}>
            <Text style={styles.investBtnText}>Invest now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Exit Modal - "Yes" button uses handleConfirmExit */}
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTopText}>Over 19381 users purchased this stock last month</Text>
            <View style={styles.avatarRow}>
              <View style={[styles.avatarCircle, { backgroundColor: '#333' }]} /><View style={[styles.avatarCircle, { backgroundColor: '#555', marginLeft: -15 }]} /><View style={[styles.avatarCircle, { backgroundColor: '#777', marginLeft: -15 }]} />
            </View>
            <Text style={styles.modalQuestion}>Are you sure you want to exit ?</Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.noButton} onPress={() => setIsModalVisible(false)}><Text style={styles.noButtonText}>No</Text></TouchableOpacity>
              <TouchableOpacity style={styles.yesButton} onPress={handleConfirmExit}><Text style={styles.yesButtonText}>Yes</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.supportButton}><Phone size={14} color="#666" /><Text style={styles.supportText}>Call support</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 17, fontWeight: '600', marginLeft: 10, flex: 1 },
  scrollContent: { paddingBottom: 40 },
  mainCard: { backgroundColor: '#fff', margin: 16, borderRadius: 15, borderWidth: 1, borderColor: '#efefef', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden' },
  kycBanner: { flexDirection: 'row', backgroundColor: '#fff0f0', margin: 15, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ffdbdb' },
  kycText: { flex: 1, fontSize: 12, color: '#444', marginLeft: 8, lineHeight: 18 },
  linkText: { color: '#d32f2f', fontWeight: 'bold' },
  summarySection: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBox: { width: 42, height: 42, backgroundColor: '#f9f9f9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  logoTxt: { fontSize: 10, fontWeight: 'bold' },
  compName: { fontSize: 14, fontWeight: '600', color: '#333' },
  priceTrend: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  greenText: { color: '#2e7d32', fontSize: 12, fontWeight: '500' },
  infoSection: { padding: 18 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
  rowLabel: { color: '#777', fontSize: 14, fontWeight: '400' },
  rowValue: { color: '#333', fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 15 },
  selectorContainer: { alignItems: 'center', paddingVertical: 25 },
  selectorTitle: { fontSize: 16, color: '#333', marginBottom: 15, fontWeight: '500' },
  counterBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, width: '90%' },
  countBtn: { padding: 14, flex: 1, alignItems: 'center' },
  unitDisplay: { flex: 2, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#ddd', paddingVertical: 14 },
  unitText: { fontSize: 18, fontWeight: 'bold' },
  amountSection: { padding: 18, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  getStartedBtn: { backgroundColor: '#d32f2f', padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 5 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  graphSection: { padding: 20, backgroundColor: '#fff', marginTop: 10 },
  graphTitle: { fontSize: 16, fontWeight: '500', color: '#444' },
  graphPriceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  graphPriceText: { fontSize: 24, fontWeight: 'bold', marginRight: 10 },
  graphSubText: { fontSize: 13, color: '#2e7d32', fontWeight: '500' },
  chartContainer: { height: 150, width: '100%', marginTop: 20 },
  timeRangeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  rangeBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, backgroundColor: '#f5f5f5' },
  activeRangeBtn: { backgroundColor: '#ffecec' },
  rangeText: { fontSize: 13, color: '#888' },
  activeRangeText: { color: '#d32f2f', fontWeight: 'bold' },
  bottomTabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 30 },
  bottomTab: { paddingBottom: 12, marginRight: 25, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeBottomTab: { borderBottomColor: '#d32f2f' },
  bottomTabText: { fontSize: 14, color: '#888' },
  activeBottomTabText: { color: '#d32f2f', fontWeight: 'bold' },
  tabContentArea: { paddingVertical: 25 },
  contentTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  contentSubTitle: { fontSize: 13, color: '#888', marginTop: 4 },
  fundamentalsGrid: { marginTop: 20 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  gridItem: { width: '48%' },
  gridLabel: { fontSize: 13, color: '#888', marginBottom: 4 },
  gridValue: { fontSize: 15, fontWeight: '700', color: '#333' },
  aboutCoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#eee' },
  boldAccordionText: { fontSize: 17, fontWeight: '700', color: '#222' },
  faqTitle: { fontSize: 18, fontWeight: '800', color: '#222', marginBottom: 15 },
  financialSubTabRow: { flexDirection: 'row', marginBottom: 20 },
  subTabBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f2f2f2', marginRight: 10 },
  activeSubTabBtn: { backgroundColor: '#ffecec' },
  subTabText: { fontSize: 13, color: '#666' },
  activeSubTabText: { color: '#d32f2f', fontWeight: '600' },
  financialHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 8, marginBottom: 10 },
  currencyNote: { fontSize: 12, color: '#666' },
  yearSelector: { flexDirection: 'row', alignItems: 'center' },
  yearText: { fontSize: 13, fontWeight: '600', color: '#333', marginRight: 4 },
  financialTable: { marginTop: 10 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', alignItems: 'center' },
  tableLabel: { fontSize: 14, color: '#555', lineHeight: 20 },
  tableValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  tableValueRed: { fontSize: 14, fontWeight: '600', color: '#d32f2f' },
  shareholderNoteBox: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginTop: 20, marginBottom: 10 },
  shareholderNoteText: { fontSize: 12, color: '#666', lineHeight: 18 },
  investNowBtn: { backgroundColor: '#d32f2f', padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 20 },
  investBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '85%', borderRadius: 20, padding: 25, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#bbb' },
  modalTopText: { fontSize: 16, fontWeight: 'bold', color: '#d32f2f', textAlign: 'center', marginBottom: 20 },
  avatarRow: { flexDirection: 'row', marginBottom: 20 },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff' },
  modalQuestion: { fontSize: 16, color: '#333', marginBottom: 25 },
  modalActionRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20 },
  noButton: { backgroundColor: '#d32f2f', flex: 1, marginRight: 10, paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  noButtonText: { color: '#fff', fontWeight: 'bold' },
  yesButton: { backgroundColor: '#f5f5f5', flex: 1, marginLeft: 10, paddingVertical: 12, borderRadius: 25, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  yesButtonText: { color: '#333', fontWeight: 'bold' },
  supportButton: { flexDirection: 'row', alignItems: 'center' },
  supportText: { fontSize: 13, color: '#666', marginLeft: 6, textDecorationLine: 'underline' }
});