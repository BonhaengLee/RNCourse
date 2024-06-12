import { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHanlder(enteredGoalText: string) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
      },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id: string) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        onAddGoal={addGoalHanlder}
        visible={modalIsVisible}
        onCancel={endAddGoalHandler}
      />

      <View style={styles.goalsContainer}>
        {/*
        성능: ScrollView는 모든 요소 목록을 항상 전부 렌더링하지만 FlatList는 작은 임계점을 넘기면 그때부터 렌더링하는 식으로 성능 최적화한다.
        ScrollView의 alwaysBounceVertical가 false면 스크롤 가능한 공간만큼 채워지지 않는 경우는 튀어오르는 효과가 없어진다. 기술문서를 보고 상황에 따라 사용하자 */}
        <FlatList
          data={courseGoals}
          renderItem={({ item }) => {
            return (
              <GoalItem
                text={item.text}
                id={item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
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

  goalsContainer: {
    flex: 5,
  },
});
