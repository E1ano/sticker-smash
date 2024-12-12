import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { type ImageSource } from "expo-image";

// Hardcoded image dimensions
const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 440;
interface IProps {
  imageSize: number;
  stickerSource: ImageSource;
}

export default function EmojiSticker({ imageSize, stickerSource }: IProps) {
  const scaleImage = useSharedValue<number>(imageSize);
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  console.log("scaleImage", scaleImage);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const drag = Gesture.Pan().onChange((event) => {
    const newX = translateX.value + event.changeX;
    const newY = translateY.value + event.changeY;

    const maxX = IMAGE_WIDTH - scaleImage.value - 15;
    const maxY = IMAGE_HEIGHT - scaleImage.value - 15;

    // Clamp the position to keep the sticker inside the image
    translateX.value = Math.min(
      Math.max(newX, 0), // Prevent moving left beyond the image
      maxX // Prevent moving right beyond the image
    );

    translateY.value = Math.min(
      Math.max(newY, 0), // Prevent moving up beyond the image
      maxY // Prevent moving down beyond the image
    );
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[
          containerStyle,
          {
            position: "absolute",
            top: 10,
            left: 10,
          },
        ]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
