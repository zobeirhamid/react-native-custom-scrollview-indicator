// @flow
import React, { Component } from "react";
import { Animated, View, Dimensions } from "react-native";
import { ContextConsumer } from "./Context";

const { width }: { width: number, height: number } = Dimensions.get("window");

type ScrollComponentDefaultProps = {|
  spacing: number,
  itemSize: number,
  horizontal: boolean,
  renderItem: Function,
  snapping: boolean
|};

type ScrollComponentProps = {
  ...ScrollComponentDefaultProps,
  onSnap?: number => void,
  animatedValue: Animated.Value
};
type ScrollComponentState = {
  dragging: boolean
};

class ScrollComponent extends Component<
  ScrollComponentProps,
  ScrollComponentState
> {
  static defaultProps: ScrollComponentDefaultProps = {
    horizontal: true,
    spacing: 0,
    itemSize: width,
    renderItem: () => null,
    snapping: true
  };

  animatedValue = new Animated.Value(0);

  state = {
    dragging: false
  };

  constructor(props) {
    super(props);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }

  onScrollBeginDrag() {
    const { onSnap } = this.props;
    if (onSnap !== undefined) {
      this.setState({ dragging: true });
    }
  }

  onMomentumScrollEnd(e) {
    const { onSnap, itemSize } = this.props;
    const { dragging } = this.state;
    if (dragging && onSnap !== undefined) {
      const index = Math.round(e.nativeEvent.contentOffset.x / itemSize);
      onSnap(index);
      this.setState({ dragging: false });
    }
  }

  render() {
    const {
      spacing,
      animatedValue,
      renderItem,
      horizontal,
      itemSize,
      passRef
    } = this.props;
    const Item: Function = renderItem;
    return (
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: horizontal
                  ? { x: animatedValue }
                  : { y: animatedValue }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        nestedScrollEnabled
        directionalLockEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          horizontal ? { paddingLeft: spacing } : { paddingTop: spacing }
        }
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index,
          index
        })}
        snapToInterval={itemSize}
        decelerationRate={"fast"}
        snapToAlignment={"start"}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        {...this.props}
        ref={passRef}
        renderItem={itemProps => (
          <View
            style={[
              horizontal
                ? {
                    width: itemSize - spacing,
                    marginRight: spacing
                  }
                : { height: itemSize - spacing, marginBottom: spacing }
            ]}
          >
            <Item {...itemProps} />
          </View>
        )}
      />
    );
  }
}

export default ContextConsumer(
  React.forwardRef((props, ref) => <ScrollComponent {...props} passRef={ref} />)
);
