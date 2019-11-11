// @flow
import * as React from 'react';
import { View } from 'react-native';
import { ContextConsumer } from './Context';

type ContainerIndicatorDefaultProps = {|
  backgroundColor: string
|};

type ContainerIndicatorProps = {
  ...ContainerIndicatorDefaultProps,
  containerSize: number,
  spacing: number,
  horizontal: boolean,
  children: ?React.Node,
  style?: mixed
};

class ContainerIndicator extends React.Component<ContainerIndicatorProps> {
  static defaultProps = {
    backgroundColor: 'lightgrey'
  };

  render() {
    const {
      containerSize,
      spacing,
      children,
      style,
      backgroundColor = 'lightgrey',
      horizontal
    } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor,
            overflow: 'hidden'
          },
          horizontal
            ? { width: containerSize, marginHorizontal: spacing }
            : { height: containerSize, marginVertical: spacing },
          style
        ]}
      >
        {children}
      </View>
    );
  }
}

export default ContextConsumer(ContainerIndicator);
