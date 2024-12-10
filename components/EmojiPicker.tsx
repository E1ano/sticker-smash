import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function EmojiPicker({ isVisible, children, onClose }: IProps) {
  const screenHeight = Dimensions.get("window").height;
  const offscreenPosition = screenHeight * 0.25 + 20;

  const slideAnim = useRef(new Animated.Value(offscreenPosition)).current; // Start off-screen
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true); // Show modal
      animateModal(0); // Slide up
    } else {
      animateModal(offscreenPosition, () => setModalVisible(false)); // Slide down, then hide modal
    }
  }, [isVisible]);

  const animateModal = (toValue: number, callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: toValue === 0 ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(callback);
  };

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] }, // Animate position
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
