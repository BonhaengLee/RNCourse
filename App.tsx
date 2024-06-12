import { useState } from "react";
import {
  Button,
  CellRendererProps,
  FlatList,
  FlatListProps,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState<
    {
      key: string;
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
        text: enteredGoalText,
        // FlatList에 데이터를 사용하는 경우 key 프로퍼티를 자동으로 참조한다.
        key: Math.random().toString(),
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
          renderItem={({ item, index }) => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{item.text}</Text>
              </View>
            );
          }}
          // keyExtractor={(item, index) => {
          //   return item.id;
          // }} key 프로퍼티를 자동으로 참조하게 하는 게 내키지 않으면 이런 방식도 있다.
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
  goalItem: {
    // color: "white",를 컨테이너 요소에 적용한다고 해도 내부의 TEXT 요소에 상속되지 않는다는 점에서 웹 CSS와 다르다.
    margin: 8,
    padding: 8,
    // iOS는 누락된다. iOS에서는 기본 네이티브 TEXT 요소가 지원하지 않는다. 컨테이너 요소에 적용하면 된다.
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
