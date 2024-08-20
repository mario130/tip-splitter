import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});