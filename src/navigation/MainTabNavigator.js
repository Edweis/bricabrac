// @FLow
import { Platform } from "react-native";
import {
  createStackNavigator,
  NavigationState,
  NavigationScreenProp
} from "react-navigation";

import BrickMaker from "../screens/BrickMaker";
import BrickList from "../screens/BrickList";
import BrickDisplay from "../screens/BrickDisplay";

const config = Platform.select({
  web: { headerMode: "screen" },

  initialRouteName: "BrickList",
  default: {}
});
// export const type NavigationProps = { navigation: NavigationScreenProp<NavigationState> };

const AppNavigator = createStackNavigator(
  {
    BrickList,
    BrickMaker,
    BrickDisplay
  },
  config
);

export default AppNavigator;
