import type { PropsWithChildren, ReactElement } from 'react';
import { useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

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
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ flexGrow: 1 }}>
        <Animated.View
          style={[
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
          className="h-[150px] overflow-hidden justify-center items-center pb-[50px]"
        >
          {headerImage}
        </Animated.View>
        <ThemedView className="flex-1 p-[32px] overflow-hidden rounded-t-[25px]">
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}