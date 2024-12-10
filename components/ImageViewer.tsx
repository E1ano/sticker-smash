import { StyleSheet } from "react-native";
import { Image } from "expo-image";

interface IProps {
  imgSource: string;
  selectedImage?: string;
}

export default function ImageViewer({ imgSource, selectedImage }: IProps) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
