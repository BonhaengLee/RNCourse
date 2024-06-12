import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface GoalItemProps {
  id: string;
  text: string;
  onDeleteItem: (id: string) => void;
}

export default function GoalItem({ id, text, onDeleteItem }: GoalItemProps) {
  return (
    <Pressable onPress={() => onDeleteItem(id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
