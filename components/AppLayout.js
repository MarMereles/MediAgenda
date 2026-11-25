//Manual Cap. 5 - Parte 2 (Paso 4)
import React from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // <-- NUEVO

const { height, width } = Dimensions.get("window");

export default function AppLayout({ children }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.background, "transparent"]}
        style={[styles.gradient, { top: -insets.top }]} // <-- El gradiente se extiende arriba del notch
      />
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1 },
  gradient: {
    height: height / 1.2,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
