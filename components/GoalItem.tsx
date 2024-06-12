import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface GoalItemProps {
  id: string;
  text: string;
  onDeleteItem: (id: string) => void;
}

export default function GoalItem({ id, text, onDeleteItem }: GoalItemProps) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        // 안드로이드 물결 효과
        android_ripple={{
          color: "#ddd",
        }}
        onPress={() => onDeleteItem(id)}
        // iOS를 위한 시각적 피드백
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
