import type { PropsWithChildren, ReactElement } from 'react';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  // const colorScheme = useColorScheme() ?? 'light';
  const colorScheme = 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView className="flex-1 bg-[#C5E4E7]">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Animated.View
          style={[
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
          className={`overflow-hidden justify-center items-center pb-[50px] ${Platform.OS === 'ios' ? 'h-[120px]' : 'h-[250px]'}`}
        >
          {headerImage}
        </Animated.View>
        <ThemedView className="flex-1 p-[32px] overflow-hidden rounded-t-[25px] mx-auto"
          style={{ paddingHorizontal: 32, maxWidth: isWideScreen ? '70%' : '100%' }}
        >
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}