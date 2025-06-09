import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { theme } from "../styles/theme";

const TermsOfServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={theme.legal.container}>
      {/* Header */}
      <View style={theme.legal.header}>
        <TouchableOpacity
          style={theme.legal.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={theme.legal.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={theme.legal.headerTitle}>Terms of Service</Text>
        <View style={theme.legal.headerSpacer} />
      </View>

      <ScrollView
        style={theme.legal.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={theme.legal.content}>
          <Text style={theme.legal.lastUpdated}>
            Last updated: January 1, 2024
          </Text>

          <Text style={theme.legal.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={theme.legal.paragraph}>
            By downloading, installing, or using our mobile application ("App"),
            you agree to be bound by these Terms of Service ("Terms"). If you do
            not agree to these Terms, please do not use our App.
          </Text>

          <Text style={theme.legal.sectionTitle}>
            2. Description of Service
          </Text>
          <Text style={theme.legal.paragraph}>
            Our App provides [describe your app's main functionality]. We
            reserve the right to modify, suspend, or discontinue any aspect of
            the service at any time.
          </Text>

          <Text style={theme.legal.sectionTitle}>3. User Accounts</Text>
          <Text style={theme.legal.paragraph}>
            To access certain features of the App, you may be required to create
            an account. You are responsible for:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Maintaining the confidentiality of your account credentials
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • All activities that occur under your account
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Providing accurate and up-to-date information
          </Text>

          <Text style={theme.legal.sectionTitle}>4. Acceptable Use</Text>
          <Text style={theme.legal.paragraph}>
            You agree not to use the App to:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Violate any applicable laws or regulations
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Infringe on the rights of others
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Upload malicious code or content
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Attempt to gain unauthorized access to our systems
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Use the App for commercial purposes without permission
          </Text>

          <Text style={theme.legal.sectionTitle}>5. Intellectual Property</Text>
          <Text style={theme.legal.paragraph}>
            The App and its original content, features, and functionality are
            owned by us and are protected by international copyright, trademark,
            patent, trade secret, and other intellectual property laws.
          </Text>

          <Text style={theme.legal.sectionTitle}>6. Privacy Policy</Text>
          <Text style={theme.legal.paragraph}>
            Your privacy is important to us. Please review our Privacy Policy,
            which also governs your use of the App, to understand our practices.
          </Text>

          <Text style={theme.legal.sectionTitle}>7. Disclaimers</Text>
          <Text style={theme.legal.paragraph}>
            The App is provided on an "AS IS" and "AS AVAILABLE" basis. We make
            no warranties, expressed or implied, and hereby disclaim all other
            warranties including implied warranties of merchantability, fitness
            for a particular purpose, or non-infringement.
          </Text>

          <Text style={theme.legal.sectionTitle}>
            8. Limitation of Liability
          </Text>
          <Text style={theme.legal.paragraph}>
            In no event shall we be liable for any indirect, incidental,
            special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other
            intangible losses.
          </Text>

          <Text style={theme.legal.sectionTitle}>9. Termination</Text>
          <Text style={theme.legal.paragraph}>
            We may terminate or suspend your account and bar access to the App
            immediately, without prior notice or liability, under our sole
            discretion, for any reason whatsoever.
          </Text>

          <Text style={theme.legal.sectionTitle}>10. Changes to Terms</Text>
          <Text style={theme.legal.paragraph}>
            We reserve the right to modify these Terms at any time. We will
            notify users of any changes by posting the new Terms on this page
            and updating the "Last updated" date.
          </Text>

          <Text style={theme.legal.sectionTitle}>11. Contact Information</Text>
          <Text style={theme.legal.paragraph}>
            If you have any questions about these Terms, please contact us at:
          </Text>
          <Text style={theme.legal.contactInfo}>
            Email: support@yourapp.com{"\n"}
            Address: Your Company Address{"\n"}
            Phone: +1 (555) 123-4567
          </Text>

          <View style={theme.legal.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen;
