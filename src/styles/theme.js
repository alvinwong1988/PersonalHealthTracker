//import { FooterComponent } from "react-native-screens/lib/typescript/components/ScreenFooter";
//import Footer from "../components/Footer";

// theme.js
export const theme = {
  // Colors
  colors: {
    primary: "#007AFF", // Main action color (e.g., buttons)
    secondary: "#5856D6", // Secondary action or highlight color
    background: "#FFFFFF", // Background color for screens
    backgroundSecondary: "#f8f9fa", // Secondary background for sections
    text: "#000000", // Default text color
    textSecondary: "#888888", // Secondary text (e.g., labels, hints)
    textTertiary: "#666666", // Tertiary text color
    textQuaternary: "#999999", // Quaternary text color
    border: "#CCCCCC", // Border color for inputs, cards, etc.
    borderLight: "#f0f0f0", // Light border color
    error: "#FF0000", // Error messages or alerts
    danger: "#ff4444", // Danger/logout color
    success: "#4CAF50", // Success color
    googleBlue: "#4285F4", // Google button color
    switchTrackFalse: "#767577", // Switch track color when false
    switchThumbFalse: "#f4f3f4", // Switch thumb color when false
    arrowColor: "#cccccc", // Arrow color for navigation items
  },

  // Typography
  typography: {
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
      color: "#888888",
    },
    // Profile specific typography
    profileUserName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
    },
    profileUserEmail: {
      fontSize: 16,
      color: "#666666",
    },
    profileMemberSince: {
      fontSize: 14,
      color: "#999999",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    profileItemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333333",
    },
    profileItemSubtitle: {
      fontSize: 14,
      color: "#666666",
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ff4444",
    },
  },

  // Spacing
  spacing: {
    small: 5,
    medium: 10,
    large: 20,
    extraLarge: 30,
  },

  // Border Radius
  borderRadius: {
    small: 5,
    medium: 10,
    large: 15,
    round: 50, // For circular elements like avatars
  },

  // Shadows (for elevation effects)
  shadows: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  },

  // Reusable Component Styles
  components: {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#FFFFFF",
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#CCCCCC",
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#4CAC50",
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      borderColor: "#CCCCCC",
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
    },
    googleIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    googleText: {
      fontSize: 16,
      color: "#4285F4",
      fontWeight: "bold",
    },
  },

  // Footer styles
  footer: {
    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      //backgroundColor: "yellow",
      //minHeight: 80,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    },
    activeIconContainer: {
      backgroundColor: "rgba(0, 122, 255, 0.1)",
      borderRadius: 20,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: "#888",
    },
    activeIcon: {
      tintColor: "#007AFF",
    },
  },

  // Profile Screen Styles
  profile: {
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    profileHeader: {
      backgroundColor: "#ffffff",
      alignItems: "center",
      paddingVertical: 30,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    avatarContainer: {
      position: "relative",
      marginBottom: 15,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#4CAF50",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#ffffff",
    },
    editAvatarButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#4CAF50",
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    editAvatarText: {
      fontSize: 16,
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: "#666666",
      marginBottom: 5,
    },
    memberSince: {
      fontSize: 14,
      color: "#999999",
    },
    section: {
      backgroundColor: "#ffffff",
      marginBottom: 20,
      paddingVertical: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    profileItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    profileItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    profileItemIcon: {
      fontSize: 20,
      marginRight: 15,
      width: 25,
      textAlign: "center",
    },
    profileItemText: {
      flex: 1,
    },
    profileItemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333333",
      marginBottom: 2,
    },
    profileItemSubtitle: {
      fontSize: 14,
      color: "#666666",
    },
    arrow: {
      fontSize: 20,
      color: "#cccccc",
      fontWeight: "300",
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    logoutButton: {
      backgroundColor: "#ffffff",
      marginHorizontal: 20,
      marginVertical: 20,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ff4444",
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ff4444",
    },
    bottomSpacing: {
      height: 100,
    },
  },
  // Add this to your theme object in theme.js
  legal: {
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#ffffff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
      backgroundColor: "#ffffff",
    },
    backButton: {
      padding: 5,
    },
    backButtonText: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "500",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    headerSpacer: {
      width: 50, // Same width as back button for centering
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    lastUpdated: {
      fontSize: 14,
      color: "#666666",
      fontStyle: "italic",
      marginBottom: 25,
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginTop: 25,
      marginBottom: 10,
    },
    subsectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      marginTop: 15,
      marginBottom: 8,
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 22,
      color: "#444444",
      marginBottom: 15,
      textAlign: "justify",
    },
    bulletPoint: {
      fontSize: 15,
      lineHeight: 22,
      color: "#444444",
      marginBottom: 8,
      paddingLeft: 10,
    },
    contactInfo: {
      fontSize: 15,
      lineHeight: 22,
      color: "#007AFF",
      marginBottom: 15,
      fontWeight: "500",
    },
    bottomSpacing: {
      height: 50,
    },
  },
  // Add this to your theme object in theme.js
  personalInfo: {
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#f8f9fa",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "#ffffff",
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    backButton: {
      padding: 5,
    },
    backButtonText: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "500",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    editButton: {
      padding: 5,
    },
    editButtonText: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "500",
    },
    scrollContainer: {
      flex: 1,
    },
    profileSection: {
      backgroundColor: "#ffffff",
      alignItems: "center",
      paddingVertical: 30,
      marginBottom: 20,
    },
    avatarContainer: {
      position: "relative",
      marginBottom: 15,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#4CAF50",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#ffffff",
    },
    changePhotoButton: {
      position: "absolute",
      bottom: -5,
      right: -5,
      backgroundColor: "#4CAF50",
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#ffffff",
    },
    changePhotoText: {
      fontSize: 12,
    },
    changePhotoTextButton: {
      marginTop: 10,
    },
    changePhotoButtonText: {
      fontSize: 14,
      color: "#007AFF",
      fontWeight: "500",
    },
    section: {
      backgroundColor: "#ffffff",
      marginBottom: 20,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 20,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 8,
    },
    fieldValue: {
      fontSize: 16,
      color: "#666666",
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e9ecef",
    },
    input: {
      fontSize: 16,
      color: "#333333",
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: "#ffffff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#007AFF",
    },
    multilineInput: {
      height: 80,
      textAlignVertical: "top",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    halfWidth: {
      width: "48%",
    },
    noteSection: {
      backgroundColor: "#ffffff",
      marginBottom: 20,
      padding: 20,
      borderLeftWidth: 4,
      borderLeftColor: "#4CAF50",
    },
    noteTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 10,
    },
    noteText: {
      fontSize: 14,
      color: "#666666",
      lineHeight: 20,
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      marginHorizontal: 20,
      marginBottom: 20,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    saveButtonDisabled: {
      backgroundColor: "#cccccc",
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ffffff",
    },
    saveButtonTextDisabled: {
      color: "#999999",
    },
    bottomSpacing: {
      height: 50,
    },
  },
  // Add this to your theme object in theme.js
  security: {
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#f8f9fa",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "#ffffff",
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    backButton: {
      padding: 5,
    },
    backButtonText: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "500",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    headerSpacer: {
      width: 50,
    },
    scrollContainer: {
      flex: 1,
    },
    statusCard: {
      backgroundColor: "#ffffff",
      margin: 20,
      padding: 20,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#4CAF50",
    },
    statusTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 5,
    },
    statusSubtitle: {
      fontSize: 14,
      color: "#666666",
      marginBottom: 15,
    },
    statusIndicator: {
      height: 6,
      backgroundColor: "#f0f0f0",
      borderRadius: 3,
      overflow: "hidden",
    },
    statusBar: {
      height: "100%",
      borderRadius: 3,
    },
    section: {
      backgroundColor: "#ffffff",
      marginBottom: 20,
      paddingVertical: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#f8f9fa",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    dangerItem: {
      backgroundColor: "#fff5f5",
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    itemIcon: {
      fontSize: 20,
      marginRight: 15,
    },
    itemTextContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333333",
      marginBottom: 2,
    },
    itemSubtitle: {
      fontSize: 14,
      color: "#666666",
    },
    itemRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    arrow: {
      fontSize: 18,
      color: "#cccccc",
      marginLeft: 10,
    },
    dangerText: {
      color: "#F44336",
    },
    bottomSpacing: {
      height: 50,
    },
    // Modal styles
    modalcontainer: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#ffffff",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    modalCancel: {
      fontSize: 16,
      color: "#007AFF",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    modalSave: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "600",
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 8,
    },
    input: {
      fontSize: 16,
      color: "#333333",
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e9ecef",
    },
    passwordRequirements: {
      backgroundColor: "#f8f9fa",
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
    },
    requirementsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 10,
    },
    requirementItem: {
      fontSize: 12,
      color: "#666666",
      marginBottom: 5,
    },
  },
  // Add this to your theme object in theme.js
  notification: {
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "#ffffff",
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    backButton: {
      padding: 5,
    },
    backButtonText: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "500",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    settingsButton: {
      padding: 5,
    },
    settingsButtonText: {
      fontSize: 18,
    },
    actionBar: {
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    markAllButton: {
      alignSelf: "flex-end",
    },
    markAllText: {
      fontSize: 14,
      color: "#007AFF",
      fontWeight: "500",
    },
    scrollContainer: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "#f8f9fa",
    },
    item: {
      backgroundColor: "#ffffff",
      marginHorizontal: 20,
      marginVertical: 5,
      borderRadius: 12,
      padding: 15,
      borderLeftWidth: 3,
      borderLeftColor: "#e9ecef",
    },
    unreadItem: {
      borderLeftColor: "#007AFF",
      backgroundColor: "#f8f9ff",
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    itemLeft: {
      flexDirection: "row",
      flex: 1,
    },
    icon: {
      fontSize: 24,
      marginRight: 12,
      marginTop: 2,
    },
    itemContent: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333333",
      marginBottom: 4,
    },
    unreadTitle: {
      fontWeight: "600",
      color: "#000000",
    },
    message: {
      fontSize: 14,
      color: "#666666",
      lineHeight: 20,
      marginBottom: 8,
    },
    time: {
      fontSize: 12,
      color: "#999999",
    },
    itemRight: {
      alignItems: "center",
      marginLeft: 10,
    },
    priorityIndicator: {
      width: 4,
      height: 30,
      borderRadius: 2,
      marginBottom: 5,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#007AFF",
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
    },
    actionButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      flex: 1,
      marginRight: 10,
    },
    actionText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    deleteButton: {
      backgroundColor: "#f8f9fa",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#e9ecef",
    },
    deleteText: {
      color: "#666666",
      fontSize: 14,
      fontWeight: "500",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 100,
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 8,
    },
    emptyMessage: {
      fontSize: 14,
      color: "#666666",
      textAlign: "center",
      paddingHorizontal: 40,
    },
    settingsContainer: {
      backgroundColor: "#ffffff",
      margin: 20,
      borderRadius: 12,
      padding: 20,
    },
    settingsTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    settingLabel: {
      fontSize: 14,
      color: "#333333",
      flex: 1,
    },
    bottomSpacing: {
      height: 50,
    },
  },
  // Add this to your theme object in theme.js
  home: {
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      color: "#666666",
    },
    notificationButton: {
      position: "relative",
      padding: 8,
    },
    notificationIcon: {
      fontSize: 24,
    },
    notificationBadge: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "#FF5722",
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 15,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    seeAllText: {
      fontSize: 14,
      color: "#007AFF",
      fontWeight: "500",
    },
    // Stats Section
    statsContainer: {
      backgroundColor: "#ffffff",
      margin: 20,
      padding: 20,
      borderRadius: 16,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    statCard: {
      width: "48%",
      backgroundColor: "#f8f9fa",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      alignItems: "center",
    },
    statIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: "#666666",
      marginBottom: 8,
    },
    progressBar: {
      width: "100%",
      height: 4,
      backgroundColor: "#e9ecef",
      borderRadius: 2,
      marginBottom: 4,
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#4CAF50",
      borderRadius: 2,
    },
    statGoal: {
      fontSize: 10,
      color: "#999999",
    },
    // Tasks Section
    tasksContainer: {
      backgroundColor: "#ffffff",
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 20,
      borderRadius: 16,
    },
    taskItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    completedTask: {
      opacity: 0.6,
    },
    taskLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    taskCheckbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#e9ecef",
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    completedCheckbox: {
      backgroundColor: "#4CAF50",
      borderColor: "#4CAF50",
    },
    checkmark: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "bold",
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333333",
      marginBottom: 2,
    },
    completedTaskTitle: {
      textDecorationLine: "line-through",
      color: "#999999",
    },
    taskTime: {
      fontSize: 12,
      color: "#666666",
    },
    taskIcon: {
      fontSize: 16,
    },
    // Actions Section
    actionsContainer: {
      backgroundColor: "#ffffff",
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 20,
      borderRadius: 16,
    },
    actionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    actionButton: {
      width: "48%",
      backgroundColor: "#007AFF",
      padding: 15,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 10,
    },
    actionIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
    actionText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
    },
    // Summary Section
    summaryContainer: {
      backgroundColor: "#ffffff",
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 20,
      borderRadius: 16,
    },
    summaryCard: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    summaryItem: {
      alignItems: "center",
      flex: 1,
    },
    summaryIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
    summaryContent: {
      alignItems: "center",
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 12,
      color: "#666666",
      textAlign: "center",
    },
    summaryDivider: {
      width: 1,
      height: 40,
      backgroundColor: "#f0f0f0",
      marginHorizontal: 10,
    },
    bottomSpacing: {
      height: 20,
    },
  },
  // Add this to your theme object in theme.js
  measurement: {
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    camera: {
      flex: 1,
    },
    controlsContainer: {
      flex: 1,
      backgroundColor: "transparent",
    },
    topControls: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    controlButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
    },
    controlIcon: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
    centerInfo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    infoCard: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 20,
      borderRadius: 16,
      alignItems: "center",
    },
    infoTitle: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
    },
    infoText: {
      color: "#ffffff",
      fontSize: 14,
      textAlign: "center",
      opacity: 0.9,
    },
    bottomControls: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingBottom: 100,
      paddingHorizontal: 40,
    },
    galleryButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    galleryIcon: {
      fontSize: 24,
    },
    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    captureInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#007AFF",
    },
    flipButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    flipIcon: {
      fontSize: 24,
    },
    manualButton: {
      position: "absolute",
      bottom: 40,
      alignSelf: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    manualText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "500",
    },
    // Loading overlay
    loadingOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      justifyContent: "center",
      alignItems: "center",
    },
    loadingCard: {
      backgroundColor: "#ffffff",
      padding: 30,
      borderRadius: 16,
      alignItems: "center",
      marginHorizontal: 40,
    },
    loadingTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginTop: 15,
      marginBottom: 8,
    },
    loadingText: {
      fontSize: 14,
      color: "#666666",
      textAlign: "center",
    },
    // Modal styles
    modalcontainer: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#ffffff",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    modalCancel: {
      fontSize: 16,
      color: "#007AFF",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    modalSave: {
      fontSize: 16,
      color: "#007AFF",
      fontWeight: "600",
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },
    // Food card
    foodCard: {
      backgroundColor: "#f8f9fa",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
    },
    foodHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    foodName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      flex: 1,
    },
    confidenceContainer: {
      backgroundColor: "#4CAF50",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    confidenceText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "500",
    },
    portion: {
      fontSize: 14,
      color: "#666666",
    },
    // Nutrition card
    nutritionCard: {
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#f0f0f0",
    },
    nutritionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 15,
    },
    caloriesRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 2,
      borderBottomColor: "#f0f0f0",
      marginBottom: 15,
    },
    caloriesLabel: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333333",
    },
    caloriesValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#007AFF",
    },
    nutritionGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    nutritionItem: {
      width: "48%",
      backgroundColor: "#f8f9fa",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: "center",
    },
    nutritionLabel: {
      fontSize: 12,
      color: "#666666",
      marginBottom: 4,
    },
    nutritionValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
    },
    // Edit card
    editCard: {
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#f0f0f0",
    },
    editTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 15,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333333",
      marginBottom: 8,
    },
    input: {
      fontSize: 16,
      color: "#333333",
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e9ecef",
    },
    // Manual entry
    manualTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 8,
      textAlign: "center",
    },
    manualSubtitle: {
      fontSize: 14,
      color: "#666666",
      textAlign: "center",
      marginBottom: 30,
    },
    manualOptionButton: {
      backgroundColor: "#007AFF",
      padding: 20,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 15,
    },
    manualOptionIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
    manualOptionText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    // Permission states
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      paddingHorizontal: 40,
    },
    permissionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 10,
      textAlign: "center",
    },
    permissionText: {
      fontSize: 16,
      color: "#666666",
      textAlign: "center",
      marginBottom: 20,
    },
    permissionButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    permissionButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    fallbackContainer: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    fallbackContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    fallbackIcon: {
      fontSize: 64,
      marginBottom: 20,
    },
    fallbackTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 15,
      textAlign: "center",
    },
    fallbackText: {
      fontSize: 16,
      color: "#666666",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 30,
    },
    fallbackButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
      marginBottom: 15,
      minWidth: 200,
    },
    fallbackButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
  },
  // SearchPage component styles
  searchPage: {
    container: {
      flex: 1,
    },
    header: {
      padding: 16,
      paddingBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
    },
    searchButton: {
      marginLeft: 10,
      borderRadius: 25,
      paddingHorizontal: 20,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 80,
    },
    searchButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    mapContainer: {
      flex: 1,
      position: "relative",
    },
    map: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
    },
    infoCard: {
      position: "absolute",
      bottom: 20,
      left: 16,
      right: 16,
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    infoHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: "bold",
      flex: 1,
    },
    closeButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#666",
    },
    restaurantInfo: {
      fontSize: 14,
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    rating: {
      fontSize: 14,
      fontWeight: "bold",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    detailsButton: {
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
    },
    detailsButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    // Additional search page specific styles
    filterContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#fff",
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#ddd",
      marginRight: 8,
    },
    activeFilterButton: {
      backgroundColor: "#007AFF",
      borderColor: "#007AFF",
    },
    filterButtonText: {
      fontSize: 14,
      color: "#666",
    },
    activeFilterButtonText: {
      color: "#fff",
    },
    // Location permission styles
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    permissionIcon: {
      fontSize: 64,
      marginBottom: 20,
      color: "#007AFF",
    },
    permissionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      textAlign: "center",
    },
    permissionText: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
    },
    permissionButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 25,
    },
    permissionButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    // Error states
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },
    errorIcon: {
      fontSize: 64,
      marginBottom: 20,
      color: "#ff4444",
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      textAlign: "center",
    },
    errorText: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
      marginBottom: 20,
    },
    retryButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    restaurantCard: {
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    restaurantHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: "bold",
      flex: 1,
      marginRight: 10,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontSize: 14,
      fontWeight: "600",
    },
    restaurantAddress: {
      fontSize: 14,
      marginBottom: 10,
      lineHeight: 20,
    },
    restaurantInfo: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    distanceText: {
      fontSize: 12,
      marginRight: 15,
    },
    priceText: {
      fontSize: 12,
      marginRight: 15,
    },
    priceLevel: {
      fontSize: 12,
      marginRight: 15,
    },
    cuisineTypes: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    cuisineTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      marginBottom: 4,
    },
    cuisineTagText: {
      fontSize: 10,
      fontWeight: "500",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 50,
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 15,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 20,
    },
    resultsText: {
      fontSize: 14,
      textAlign: "center",
    },
  },
};

export default theme;
