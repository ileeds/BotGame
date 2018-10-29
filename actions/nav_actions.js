import NavigationService from "../appUtils/NavigationService";

export const getInitialScreen = () => (dispatch, getState) => {
  const { auth } = getState();
  // if phone not in state, start at get code
  if (!auth.phone) {
    NavigationService.navigate("getCode");
    // if not logged in but phone in state, start at enter code
  } else if (!auth.loggedIn) {
    NavigationService.navigate("enterCode");
    // if username not set but logged in, start at username
  } else if (!auth.username) {
    NavigationService.navigate("username");
    // signed up users go to home page
  } else {
    NavigationService.navigate("home");
  }
};
