import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { theme } from "../styles/theme";

const PrivacyPolicyScreen = ({ navigation }) => {
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
        <Text style={theme.legal.headerTitle}>Privacy Policy</Text>
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

          <Text style={theme.legal.sectionTitle}>
            1. Information We Collect
          </Text>

          <Text style={theme.legal.subsectionTitle}>Personal Information</Text>
          <Text style={theme.legal.paragraph}>
            We may collect personal information that you provide directly to us,
            such as:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Name and contact information
          </Text>
          <Text style={theme.legal.bulletPoint}>• Email address</Text>
          <Text style={theme.legal.bulletPoint}>• Phone number</Text>
          <Text style={theme.legal.bulletPoint}>• Profile information</Text>

          <Text style={theme.legal.subsectionTitle}>
            Automatically Collected Information
          </Text>
          <Text style={theme.legal.paragraph}>
            When you use our App, we may automatically collect:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Device information (model, operating system, unique device
            identifiers)
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Usage data (features used, time spent, interactions)
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Location data (with your permission)
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Log information (IP address, access times, pages viewed)
          </Text>

          <Text style={theme.legal.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <Text style={theme.legal.paragraph}>
            We use the collected information for various purposes:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To provide and maintain our App
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To improve user experience
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To send you updates and notifications
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To provide customer support
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To detect and prevent fraud
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To comply with legal obligations
          </Text>

          <Text style={theme.legal.sectionTitle}>3. Information Sharing</Text>
          <Text style={theme.legal.paragraph}>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except in the following circumstances:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • With your explicit consent
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To comply with legal requirements
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • To protect our rights and safety
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • With trusted service providers who assist in operating our App
          </Text>

          <Text style={theme.legal.sectionTitle}>4. Data Security</Text>
          <Text style={theme.legal.paragraph}>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet is
            100% secure.
          </Text>

          <Text style={theme.legal.sectionTitle}>5. Data Retention</Text>
          <Text style={theme.legal.paragraph}>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required by law.
          </Text>

          <Text style={theme.legal.sectionTitle}>6. Your Rights</Text>
          <Text style={theme.legal.paragraph}>
            Depending on your location, you may have the following rights:
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Access to your personal information
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Correction of inaccurate information
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Deletion of your personal information
          </Text>
          <Text style={theme.legal.bulletPoint}>
            • Restriction of processing
          </Text>
          <Text style={theme.legal.bulletPoint}>• Data portability</Text>
          <Text style={theme.legal.bulletPoint}>• Objection to processing</Text>

          <Text style={theme.legal.sectionTitle}>7. Cookies and Tracking</Text>
          <Text style={theme.legal.paragraph}>
            Our App may use cookies and similar tracking technologies to enhance
            user experience and collect usage information. You can control
            cookie settings through your device settings.
          </Text>

          <Text style={theme.legal.sectionTitle}>8. Third-Party Services</Text>
          <Text style={theme.legal.paragraph}>
            Our App may contain links to third-party websites or integrate with
            third-party services. We are not responsible for the privacy
            practices of these third parties.
          </Text>

          <Text style={theme.legal.sectionTitle}>9. Children's Privacy</Text>
          <Text style={theme.legal.paragraph}>
            Our App is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
          </Text>

          <Text style={theme.legal.sectionTitle}>
            10. International Data Transfers
          </Text>
          <Text style={theme.legal.paragraph}>
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            for such transfers.
          </Text>

          <Text style={theme.legal.sectionTitle}>
            11. Changes to Privacy Policy
          </Text>
          <Text style={theme.legal.paragraph}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </Text>

          <Text style={theme.legal.sectionTitle}>12. Contact Us</Text>
          <Text style={theme.legal.paragraph}>
            If you have any questions about this Privacy Policy, please contact
            us:
          </Text>
          <Text style={theme.legal.contactInfo}>
            Email: privacy@yourapp.com{"\n"}
            Address: Your Company Address{"\n"}
            Phone: +1 (555) 123-4567{"\n"}
            Data Protection Officer: dpo@yourapp.com
          </Text>

          <View style={theme.legal.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
