import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CitasProvider } from "./context/CitasContext";
import AppLayout from "./components/AppLayout";

import HomeScreen from "./screens/HomeScreen";
import RegistroCitaScreen from "./screens/RegistroCitaScreen";
import DetalleCitaScreen from "./screens/DetalleCitaScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "rgba(80, 3, 136, 1)",
    primary: "#C0C0C0",
    background: "#1A237E",
  },
};

function withAppLayout(Component) {
  return function Wrapper(props) {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
}

const HomeWithLayout = withAppLayout(HomeScreen);
const RegistroWithLayout = withAppLayout(RegistroCitaScreen);
const DetalleWithLayout = withAppLayout(DetalleCitaScreen);

function getTabIcon(routeName, focused) {
  if (routeName === "Inicio") return focused ? "home" : "home-outline";
  if (routeName === "Registrar")
    return focused ? "add-circle" : "add-circle-outline";
  return "ellipse-outline";
}

function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaCitas"
        component={HomeWithLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalleCita"
        component={DetalleWithLayout}
        options={{
          headerShown: true,
          title: "Detalle de la Cita",
          headerBackTitle: "Volver",
          headerTintColor: "#1A237E",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "bold", color: "#1A237E" },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CitasProvider>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: "#1A237E",
              tabBarInactiveTintColor: "gray",
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={getTabIcon(route.name, focused)}
                  size={size}
                  color={color}
                />
              ),
            })}
          >
            <Tab.Screen name="Inicio" component={InicioStack} />
            <Tab.Screen name="Registrar" component={RegistroWithLayout} />
          </Tab.Navigator>
        </NavigationContainer>
      </CitasProvider>
    </SafeAreaProvider>
  );
}
