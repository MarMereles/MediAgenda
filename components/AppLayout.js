//Manual Cap. 5 - Parte 2 (Paso 4)
import React from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default function AppLayout({ children }) {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.background, "transparent"]}
        style={styles.gradient}
      />
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>{children}</View>
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
