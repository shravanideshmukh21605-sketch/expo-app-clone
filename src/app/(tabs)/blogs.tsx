import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data for famous unlisted shares blogs
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Why Investing in Pre-IPO Shares is the New Gold Mine',
    category: 'UNLISTED SHARES',
    date: 'Feb 10, 2026',
    author: 'Vijay Kuppa',
    image: 'https://images.unsplash.com/photo-1611974715853-2b8ef9a36ceb?q=80&w=500&auto=format&fit=crop',
    url: 'https://www.incredmoney.com/blog/unlisted-shares-investment-guide/',
  },
  {
    id: '2',
    title: 'HDB Finance IPO: Everything You Need to Know Before 2025',
    category: 'MARKET UPDATES',
    date: 'Jan 28, 2026',
    author: 'Pureframe Insights',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=500&auto=format&fit=crop',
    url: 'https://www.incredmoney.com/blog/hdb-financial-services-ipo-update/',
  },
  {
    id: '3',
    title: 'Taxation on Unlisted Shares: A Complete Breakdown',
    category: 'TAX & LEGAL',
    date: 'Jan 15, 2026',
    author: 'Finance Expert',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500&auto=format&fit=crop',
    url: 'https://www.moneycontrol.com/news/business/personal-finance/tax-on-unlisted-shares-all-you-need-to-know-1123456.html',
  },
  {
    id: '4',
    title: 'The Rise of Digital Gold in the Modern Portfolio',
    category: 'DIGITAL ASSETS',
    date: 'Dec 22, 2025',
    author: 'Gayatri Rode',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop',
    url: 'https://www.incredmoney.com/blog/digital-gold-benefits/',
  }
];

const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => {
  const handlePress = () => {
    Linking.openURL(post.url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handlePress}>
      <Image source={{ uri: post.image }} style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{post.category}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{post.author} • {post.date}</Text>
          <Ionicons name="arrow-forward" size={16} color="#D32F2F" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function BlogsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insights & Blogs</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Learn while you earn</Text>
          <Text style={styles.introSub}>Deep dives into unlisted markets, regulatory shifts, and portfolio management.</Text>
        </View>

        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}

        <View style={styles.newsletterBox}>
          <Ionicons name="mail-unread-outline" size={32} color="#fff" />
          <Text style={styles.newsTitle}>Weekly Market Summary</Text>
          <Text style={styles.newsSub}>Join 50k+ investors receiving curated insights every Monday.</Text>
          <TouchableOpacity style={styles.newsBtn}>
            <Text style={styles.newsBtnText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F2',
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1F' },
  scrollContent: { paddingBottom: 40 },
  introSection: { padding: 20, backgroundColor: '#fff', marginBottom: 10 },
  introTitle: { fontSize: 24, fontWeight: '800', color: '#1A1D1F' },
  introSub: { fontSize: 14, color: '#8892A3', marginTop: 5, lineHeight: 20 },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  thumbnail: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { padding: 15 },
  tagContainer: {
    backgroundColor: '#D32F2F10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  tagText: { color: '#D32F2F', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  title: { fontSize: 17, fontWeight: '700', color: '#1A1D1F', lineHeight: 24 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  footerText: { fontSize: 12, color: '#8892A3' },
  newsletterBox: {
    backgroundColor: '#232F3E',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  newsTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  newsSub: { color: '#fff', opacity: 0.7, textAlign: 'center', fontSize: 13, marginTop: 8, lineHeight: 18 },
  newsBtn: { backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 100, marginTop: 20 },
  newsBtnText: { color: '#232F3E', fontWeight: 'bold', fontSize: 14 },
});