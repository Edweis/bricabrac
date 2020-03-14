import React from 'react';
import * as Sentry from 'sentry-expo';
import { ScrollView, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { IS_DEV } from '../../firebase';
import genericErrorImage from '../../assets/images/error.png';

type Props = {};
type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};
const styles = StyleSheet.create({
  main: {
    display: 'flex',
    padding: 10,
    justifyContent: 'flex-start',
  },
});
const screenWidth = Math.round(Dimensions.get('window').width);
const errorImageDims = { width: screenWidth, height: screenWidth };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error, errorInfo: React.ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    if (!IS_DEV) {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
    return { hasError: true, error, errorInfo };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ScrollView contentContainerStyle={styles.main}>
          <Image style={errorImageDims} source={genericErrorImage} />
          <Text>{this.state.error && this.state.error.message}</Text>
          <Text>{this.state.errorInfo}</Text>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
