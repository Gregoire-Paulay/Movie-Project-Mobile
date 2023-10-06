import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const CustomGoBack = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      onPress={() => navigation.goBack()}
      name="caret-back"
      size={24}
      color="white"
    />
  );
};

export default CustomGoBack;
