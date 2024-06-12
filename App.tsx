import { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);

  function goalInputHandler(enteredText: string) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHanlder() {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
      },
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHanlder} />
      </View>

      <View style={styles.goalsContainer}>
        {/*
        성능: ScrollView는 모든 요소 목록을 항상 전부 렌더링하지만 FlatList는 작은 임계점을 넘기면 그때부터 렌더링하는 식으로 성능 최적화한다.
        ScrollView의 alwaysBounceVertical가 false면 스크롤 가능한 공간만큼 채워지지 않는 경우는 튀어오르는 효과가 없어진다. 기술문서를 보고 상황에 따라 사용하자 */}
        <FlatList
          data={courseGoals}
          renderItem={({ item }) => {
            return <GoalItem text={item.text} />;
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
});
