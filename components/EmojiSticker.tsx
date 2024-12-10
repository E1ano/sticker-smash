import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";

interface IProps {
  imageSize: number;
  stickerSource: ImageSource;
}

export default function EmojiSticker({ imageSize, stickerSource }: IProps) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
