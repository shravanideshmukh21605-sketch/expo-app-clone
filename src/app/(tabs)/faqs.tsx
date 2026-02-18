import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.faqContainer}>
      <TouchableOpacity
        style={styles.questionRow}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#1A1D1F"
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.answerContainer}>{answer}</View>}
    </View>
  );
};

export default function GeneralFAQs() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General FAQs</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <FAQItem
          question="Who sells Unlisted Shares?"
          answer={
            <Text style={styles.answerText}>
              Existing shareholders of the unlisted company can sell Unlisted Shares. These include Employees, Ex-employees, Promoters, Private Equity investors, and more.{"\n\n"}
              The issuing company may or may not be involved. If the company is looking to raise funds and issue further paid-up capital, it can be involved, otherwise, the company is not involved.
            </Text>
          }
        />

        <FAQItem
          question="Are the shares being sold in DEMAT form?"
          answer={
            <Text style={styles.answerText}>
              Yes. All shares being sold are in the DEMAT form and will be credited to the DEMAT details shared with us during your KYC.
            </Text>
          }
        />

        <FAQItem
          question="Does Pure Frame Labs Pvt Ltd recommend any stocks?"
          answer={
            <Text style={styles.answerText}>
              Pure Frame Labs Pvt Ltd is not a SEBI registered Research Analyst nor is it a SEBI registered investment advisor. We do not recommend any stocks. We will provide you with in-depth information prepared by experts which will help you in your research and decision making. You can also consult your financial advisor for their assistance in investing in Unlisted Shares.
            </Text>
          }
        />

        <FAQItem
          question="How is pricing of an Unlisted Share determined?"
          answer={
            <Text style={styles.answerText}>
              Pricing of Unlisted Shares is determined on the basis of demand and supply, and is determined by various brokers who are operating in this market. If there is high demand for a stock due to this business performance or funding or IPO news, then its price goes up.{"\n\n"}
              Similarly if the fundamentals of a company deteriorate, the price of the share will go down. This is similar to how pricing happens in the listed space. However, one more factor to consider due to the unlisted nature of the share is that If there is a high demand for a stock without adequate supply, the prices might shoot up significantly without there being any significant change in the fundamentals of the company.
            </Text>
          }
        />

        <FAQItem
          question="When will the Companies IPO?"
          answer={
            <Text style={styles.answerText}>
              Determining when a company will opt for an IPO can be challenging. Sometimes, regulatory mandates, such as those from the RBI, require certain companies to get listed (e.g., HDB Finance and Tata Capital must be listed by September 2025). Otherwise, the decision to pursue an IPO depends on the company's objectives, management, and shareholders, as well as market conditions.{"\n\n"}
              Typically, most IPOs occur when the company feel's it has reached a stage of maturity or a size that makes sense for it to go public. However, it is also possible that a company may choose not to go public for a very long time.
            </Text>
          }
        />

        <FAQItem
          question="What happens if they don't IPO?"
          answer={
            <Text style={styles.answerText}>
              Even if a company does not opt for an IPO, you are still holding onto an asset that has the potential to increase in value. IPO event merely signifies availability of liquidity. While it is an important event for you as an investor, a non-ipo doesn't diminish the value of the asset you are holding. That is solely driven by its business fundamentals.{"\n\n"}
              Yes, liquidity is definitely much easier if an IPO happens, but you can also explore other options for availing liquidity such as selling them to a broker or any other participant in the unlisted market.
            </Text>
          }
        />

        <FAQItem
          question="Can investors sell their shares to us?"
          answer={
            <View>
              <Text style={styles.answerText}>
                We strongly advise investors not to approach Unlisted Shares with a trading mindset or the expectation of short-term exits. These investments are best suited for those with a long-term horizon. Unlisted shares typically have limited liquidity.
              </Text>
              <Text style={styles.boldSub}>How the process works:</Text>
              <Text style={styles.answerText}>
                • Deal Sheet: We will send you a document with all transaction details.{"\n"}
                • Transfer of Shares: You'll need to transfer shares from your demat account to ours.{"\n"}
                • Fund Transfer: Once we receive the shares, we'll confirm receipt and transfer funds to your registered bank account.
              </Text>
            </View>
          }
        />

        <FAQItem
          question="Once I purchase the shares, where can I track them?"
          answer={
            <Text style={styles.answerText}>
              Shares would be delivered to the DEMAT account shared with us on a T+3 basis. You can check them in:{"\n\n"}
              • Demat holdings section of your Broking account.{"\n"}
              • CDSL Myeasi app or NSDL Speede app.{"\n"}
              • The Pure Frame Labs Pvt Ltd app/website dashboard.
            </Text>
          }
        />

        <FAQItem
          question="How do I download the app?"
          answer={
            <Text style={styles.answerText}>
              You can download our app from play store or app store.{"\n\n"}
              App Store: https://apps.apple.com/in/app/incred-money/id6449935824{"\n"}
              Play Store: https://play.google.com/store/search?q=incred+money+app
            </Text>
          }
        />

        {/* Support Section Footer */}
        <View style={styles.supportFooter}>
          <Text style={styles.supportTitle}>Still need help?</Text>
          <Text style={styles.supportSub}>Write to us at connect@Pure Frame Labs Pvt Ltd.com with your details (Full Name, PAN, Company Name, Quantity).</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1F' },
  scrollContent: { paddingBottom: 30 },
  faqContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingVertical: 5,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1D1F',
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FAFBFC',
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  boldSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1D1F',
    marginTop: 15,
    marginBottom: 5,
  },
  supportFooter: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    marginTop: 20,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D1F',
    marginBottom: 10,
  },
  supportSub: {
    fontSize: 13,
    color: '#8892A3',
    textAlign: 'center',
    lineHeight: 20,
  },
});