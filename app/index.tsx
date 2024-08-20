import { Image, Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const MyStatusBar = () => (
  <View className="bg-[#C5E4E7] h-[StatusBar.currentHeight]">
    <SafeAreaView className="flex-1">
      <StatusBar translucent backgroundColor="#C5E4E7" barStyle={'default'} />
    </SafeAreaView>
  </View>
);

export default function HomeScreen() {
  return (
    <>
      <MyStatusBar />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#C5E4E7', dark: '#1D3D47' }}
        headerImage={
          <Image source={require('@/assets/images/SPLITTER.png')} />
        }>
        <ThemedView className="flex-row items-center gap-2 rounded-2xl">
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView className="gap-2 mt-4">
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView className="gap-2 mt-4">
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView className="gap-2 mt-4">
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}